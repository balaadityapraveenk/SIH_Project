package com.portal.backend.controller;

import com.portal.backend.dto.StudentDetailResponse;
import com.portal.backend.entity.*;
import com.portal.backend.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public ApplicationController(ApplicationRepository applicationRepository,
                                 UserRepository userRepository,
                                 JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    @PostMapping
    public ResponseEntity<?> apply(@RequestParam Long studentId, @RequestParam Long jobId) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        Optional<Job> jobOpt = jobRepository.findById(jobId);

        if (studentOpt.isEmpty() || jobOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student or Job opening not found.");
        }

        User student = studentOpt.get();
        Job job = jobOpt.get();

        // 1. Double check existing applications
        if (applicationRepository.findByStudentIdAndJobId(studentId, jobId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Application already submitted for this opening.");
        }

        // 2. Eligibility checks
        if (student.getCgpa() != null && student.getCgpa() < job.getCgpaRequired()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Your CGPA (" + student.getCgpa() + ") does not meet the minimum requirement (" + job.getCgpaRequired() + ").");
        }

        Application application = Application.builder()
                .student(student)
                .job(job)
                .status("Applied")
                .appliedDate(LocalDate.now())
                .build();

        Application saved = applicationRepository.save(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentApplications(@PathVariable Long studentId) {
        List<Application> apps = applicationRepository.findByStudentId(studentId);
        List<StudentDetailResponse.ApplicationResponse> dtos = apps.stream()
                .map(a -> StudentDetailResponse.ApplicationResponse.builder()
                        .jobId(a.getJob().getId())
                        .jobTitle(a.getJob().getTitle())
                        .companyName(a.getJob().getCompany().getName())
                        .status(a.getStatus())
                        .appliedDate(a.getAppliedDate().toString())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getCompanyApplications(@PathVariable Long companyId) {
        List<Application> apps = applicationRepository.findByJobCompanyId(companyId);
        return ResponseEntity.ok(apps);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Application> appOpt = applicationRepository.findById(id);
        if (appOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application record not found.");
        }

        Application app = appOpt.get();
        app.setStatus(status);
        applicationRepository.save(app);

        return ResponseEntity.ok("Application stage updated successfully.");
    }
}
