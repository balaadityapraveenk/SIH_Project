package com.portal.backend.controller;

import com.portal.backend.dto.GapAnalysisResponse;
import com.portal.backend.dto.SkillDto;
import com.portal.backend.entity.Skill;
import com.portal.backend.entity.StudentSkill;
import com.portal.backend.entity.User;
import com.portal.backend.repository.SkillRepository;
import com.portal.backend.repository.StudentSkillRepository;
import com.portal.backend.repository.UserRepository;
import com.portal.backend.service.GapAnalysisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
public class SkillController {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final GapAnalysisService gapAnalysisService;

    public SkillController(UserRepository userRepository,
                           SkillRepository skillRepository,
                           StudentSkillRepository studentSkillRepository,
                           GapAnalysisService gapAnalysisService) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.gapAnalysisService = gapAnalysisService;
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<?> getStudentSkills(@PathVariable Long id) {
        List<StudentSkill> skills = studentSkillRepository.findByStudentId(id);
        List<SkillDto> dtos = skills.stream()
                .map(s -> SkillDto.builder()
                        .name(s.getSkill().getName())
                        .level(s.getLevel())
                        .category(s.getSkill().getCategory())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{id}/skills")
    public ResponseEntity<?> addOrUpdateSkill(@PathVariable Long id, @RequestBody SkillDto skillDto) {
        Optional<User> studentOpt = userRepository.findById(id);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }
        User student = studentOpt.get();

        // Find or seed skill dynamically if not found
        Optional<Skill> skillOpt = skillRepository.findByName(skillDto.getName());
        Skill skill;
        if (skillOpt.isEmpty()) {
            // Give a new ID
            long newId = skillRepository.count() + 1;
            skill = Skill.builder()
                    .id(newId)
                    .name(skillDto.getName())
                    .category(skillDto.getCategory() != null ? skillDto.getCategory() : "General")
                    .build();
            skillRepository.save(skill);
        } else {
            skill = skillOpt.get();
        }

        // Add or update mapping
        Optional<StudentSkill> mapOpt = studentSkillRepository.findByStudentIdAndSkillId(student.getId(), skill.getId());
        StudentSkill studentSkill;
        if (mapOpt.isPresent()) {
            studentSkill = mapOpt.get();
            studentSkill.setLevel(skillDto.getLevel());
        } else {
            studentSkill = StudentSkill.builder()
                    .student(student)
                    .skill(skill)
                    .level(skillDto.getLevel())
                    .build();
        }
        studentSkillRepository.save(studentSkill);

        return ResponseEntity.ok("Skill mapped successfully.");
    }

    @DeleteMapping("/{id}/skills/{skillName}")
    public ResponseEntity<?> removeSkill(@PathVariable Long id, @PathVariable String skillName) {
        Optional<Skill> skillOpt = skillRepository.findByName(skillName);
        if (skillOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Skill not found in catalog.");
        }

        Optional<StudentSkill> mapOpt = studentSkillRepository.findByStudentIdAndSkillId(id, skillOpt.get().getId());
        if (mapOpt.isPresent()) {
            studentSkillRepository.delete(mapOpt.get());
            return ResponseEntity.ok("Skill unmapped successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Skill not mapped for this student.");
    }

    @GetMapping("/{id}/gap-analysis")
    public ResponseEntity<?> getGapAnalysis(@PathVariable Long id, @RequestParam String role) {
        List<StudentSkill> skills = studentSkillRepository.findByStudentId(id);
        GapAnalysisResponse analysis = gapAnalysisService.performGapAnalysis(skills, role);
        if (analysis == null) {
            return ResponseEntity.badRequest().body("Invalid role specified.");
        }
        return ResponseEntity.ok(analysis);
    }
}
