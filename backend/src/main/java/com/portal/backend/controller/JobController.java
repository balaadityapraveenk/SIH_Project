package com.portal.backend.controller;

import com.portal.backend.dto.JobDto;
import com.portal.backend.dto.JobPostRequest;
import com.portal.backend.dto.SkillDto;
import com.portal.backend.entity.*;
import com.portal.backend.repository.*;
import com.portal.backend.service.MatchingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final MatchingService matchingService;

    public JobController(JobRepository jobRepository,
                         JobSkillRepository jobSkillRepository,
                         UserRepository userRepository,
                         SkillRepository skillRepository,
                         StudentSkillRepository studentSkillRepository,
                         MatchingService matchingService) {
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.matchingService = matchingService;
    }

    @GetMapping
    public ResponseEntity<?> getAllJobs(@RequestParam(required = false) Long studentId) {
        List<Job> jobs = jobRepository.findAll();
        List<StudentSkill> studentSkills = new ArrayList<>();
        
        if (studentId != null) {
            studentSkills = studentSkillRepository.findByStudentId(studentId);
        }

        final List<StudentSkill> finalStudentSkills = studentSkills;
        List<JobDto> dtos = jobs.stream().map(job -> {
            List<JobSkill> reqSkills = jobSkillRepository.findByJobId(job.getId());
            List<SkillDto> skillDtos = reqSkills.stream()
                    .map(s -> SkillDto.builder()
                            .name(s.getSkill().getName())
                            .level(s.getLevelRequired())
                            .category(s.getSkill().getCategory())
                            .build())
                    .collect(Collectors.toList());

            Integer matchScore = null;
            if (studentId != null) {
                matchScore = matchingService.calculateMatchScore(finalStudentSkills, reqSkills);
            }

            return JobDto.builder()
                    .id(job.getId())
                    .title(job.getTitle())
                    .description(job.getDescription())
                    .companyId(job.getCompany().getId())
                    .companyName(job.getCompany().getName())
                    .location(job.getLocation())
                    .type(job.getType())
                    .stipend(job.getStipend())
                    .cgpaRequired(job.getCgpaRequired())
                    .skillsRequired(skillDtos)
                    .matchPercentage(matchScore)
                    .build();
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<?> postJob(@RequestParam Long companyId, @RequestBody JobPostRequest request) {
        Optional<User> companyOpt = userRepository.findById(companyId);
        if (companyOpt.isEmpty() || !companyOpt.get().getRole().equalsIgnoreCase("industry")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid company ID specified.");
        }
        User company = companyOpt.get();

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .company(company)
                .location(request.getLocation())
                .type(request.getType())
                .stipend(request.getStipend())
                .cgpaRequired(request.getCgpaRequired())
                .build();

        Job savedJob = jobRepository.save(job);

        // Save requirements
        if (request.getSkillsRequired() != null) {
            for (SkillDto sd : request.getSkillsRequired()) {
                Optional<Skill> skillOpt = skillRepository.findByName(sd.getName());
                Skill skill;
                if (skillOpt.isEmpty()) {
                    long newId = skillRepository.count() + 1;
                    skill = Skill.builder()
                            .id(newId)
                            .name(sd.getName())
                            .category(sd.getCategory() != null ? sd.getCategory() : "General")
                            .build();
                    skillRepository.save(skill);
                } else {
                    skill = skillOpt.get();
                }

                JobSkill js = JobSkill.builder()
                        .job(savedJob)
                        .skill(skill)
                        .levelRequired(sd.getLevel())
                        .build();
                jobSkillRepository.save(js);
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Job posted successfully.");
    }
}
