package com.portal.backend.controller;

import com.portal.backend.dto.AcademiaMetricsResponse;
import com.portal.backend.dto.CurriculumGapDto;
import com.portal.backend.dto.SkillAggregateDto;
import com.portal.backend.entity.Job;
import com.portal.backend.entity.JobSkill;
import com.portal.backend.entity.StudentSkill;
import com.portal.backend.entity.User;
import com.portal.backend.repository.JobRepository;
import com.portal.backend.repository.JobSkillRepository;
import com.portal.backend.repository.StudentSkillRepository;
import com.portal.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/academia")
public class AcademiaController {

    private final UserRepository userRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;

    public AcademiaController(UserRepository userRepository,
                              StudentSkillRepository studentSkillRepository,
                              JobRepository jobRepository,
                              JobSkillRepository jobSkillRepository) {
        this.userRepository = userRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
    }

    @GetMapping("/metrics")
    public ResponseEntity<?> getAcademiaMetrics(@RequestParam(required = false) String college) {
        // 1. Get all students matching college name
        List<User> students = userRepository.findAll().stream()
                .filter(u -> u.getRole().equalsIgnoreCase("student"))
                .filter(u -> college == null || u.getCollege().equalsIgnoreCase(college))
                .collect(Collectors.toList());

        int totalStudents = students.size();
        if (totalStudents == 0) {
            return ResponseEntity.ok(AcademiaMetricsResponse.builder()
                    .totalStudents(0)
                    .skillAggregates(new ArrayList<>())
                    .curriculumGaps(new ArrayList<>())
                    .placementRate(0)
                    .activeCollabCompanies(0)
                    .build());
        }

        // 2. Aggregate student skills
        Map<String, Long> skillCountMap = new HashMap<>();
        Map<String, Double> skillTotalLevelMap = new HashMap<>();

        for (User student : students) {
            List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(student.getId());
            for (StudentSkill ss : studentSkills) {
                String name = ss.getSkill().getName();
                skillCountMap.put(name, skillCountMap.getOrDefault(name, 0L) + 1);
                skillTotalLevelMap.put(name, skillTotalLevelMap.getOrDefault(name, 0.0) + ss.getLevel());
            }
        }

        List<SkillAggregateDto> skillAggregates = skillCountMap.keySet().stream()
                .map(name -> {
                    long count = skillCountMap.get(name);
                    double totalLevel = skillTotalLevelMap.get(name);
                    int avgLevel = (int) Math.round(totalLevel / count);
                    return new SkillAggregateDto(name, count, avgLevel);
                })
                .sorted((a, b) -> b.getStudentCount().compareTo(a.getStudentCount()))
                .collect(Collectors.toList());

        // 3. Curriculum Gap Analysis: Required skills in ALL active postings vs adoption in this college
        List<Job> allJobs = jobRepository.findAll();
        int totalJobs = allJobs.size();

        Map<String, Long> demandMap = new HashMap<>();
        for (Job job : allJobs) {
            List<JobSkill> jobSkills = jobSkillRepository.findByJobId(job.getId());
            for (JobSkill js : jobSkills) {
                String name = js.getSkill().getName();
                demandMap.put(name, demandMap.getOrDefault(name, 0L) + 1);
            }
        }

        List<CurriculumGapDto> gaps = new ArrayList<>();
        for (String skillName : demandMap.keySet()) {
            long demandCount = demandMap.get(skillName);
            int jobFreqPercent = (int) Math.round(((double) demandCount / (totalJobs == 0 ? 1 : totalJobs)) * 100.0);

            SkillAggregateDto agg = skillAggregates.stream()
                    .filter(s -> s.getName().equalsIgnoreCase(skillName))
                    .findFirst()
                    .orElse(null);

            int studentReachPercent = agg != null 
                    ? (int) Math.round(((double) agg.getStudentCount() / totalStudents) * 100.0) 
                    : 0;

            int averageCollegeLevel = agg != null ? agg.getAverageLevel() : 0;
            int gapScore = Math.max(0, jobFreqPercent - studentReachPercent);

            gaps.add(CurriculumGapDto.builder()
                    .skillName(skillName)
                    .industryDemandFreq(jobFreqPercent)
                    .studentReach(studentReachPercent)
                    .averageCollegeLevel(averageCollegeLevel)
                    .gapScore(gapScore)
                    .build());
        }

        gaps.sort((a, b) -> b.getGapScore().compareTo(a.getGapScore()));

        // Count company accounts
        long activeCompaniesCount = userRepository.findAll().stream()
                .filter(u -> u.getRole().equalsIgnoreCase("industry"))
                .count();

        AcademiaMetricsResponse response = AcademiaMetricsResponse.builder()
                .totalStudents(totalStudents)
                .skillAggregates(skillAggregates)
                .curriculumGaps(gaps)
                .placementRate(78) // Mock rate
                .activeCollabCompanies((int) activeCompaniesCount)
                .build();

        return ResponseEntity.ok(response);
    }
}
