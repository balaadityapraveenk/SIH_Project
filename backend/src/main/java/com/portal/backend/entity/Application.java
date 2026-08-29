package com.portal.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(nullable = false)
    private String status; // 'Applied', 'Under Review', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected'

    @Column(name = "applied_date", nullable = false)
    private LocalDate appliedDate;

    // Constructors
    public Application() {}

    public Application(Long id, User student, Job job, String status, LocalDate appliedDate) {
        this.id = id;
        this.student = student;
        this.job = job;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    public static ApplicationBuilder builder() {
        return new ApplicationBuilder();
    }

    public static class ApplicationBuilder {
        private Long id;
        private User student;
        private Job job;
        private String status;
        private LocalDate appliedDate;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder student(User student) { this.student = student; return this; }
        public ApplicationBuilder job(Job job) { this.job = job; return this; }
        public ApplicationBuilder status(String status) { this.status = status; return this; }
        public ApplicationBuilder appliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; return this; }

        public Application build() {
            return new Application(id, student, job, status, appliedDate);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }
}
