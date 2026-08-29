package com.portal.backend.dto;

import java.util.List;

public class StudentDetailResponse {
    private Long id;
    private String name;
    private String email;
    private String college;
    private String degree;
    private Double cgpa;
    private Integer graduationYear;
    private List<SkillDto> skills;
    private List<ProjectDto> projects;
    private List<CertificationDto> certifications;
    private List<ApplicationResponse> applications;

    public StudentDetailResponse() {}

    public StudentDetailResponse(Long id, String name, String email, String college, String degree, Double cgpa, Integer graduationYear, List<SkillDto> skills, List<ProjectDto> projects, List<CertificationDto> certifications, List<ApplicationResponse> applications) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.college = college;
        this.degree = degree;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.skills = skills;
        this.projects = projects;
        this.certifications = certifications;
        this.applications = applications;
    }

    public static StudentDetailResponseBuilder builder() {
        return new StudentDetailResponseBuilder();
    }

    public static class StudentDetailResponseBuilder {
        private Long id;
        private String name;
        private String email;
        private String college;
        private String degree;
        private Double cgpa;
        private Integer graduationYear;
        private List<SkillDto> skills;
        private List<ProjectDto> projects;
        private List<CertificationDto> certifications;
        private List<ApplicationResponse> applications;

        public StudentDetailResponseBuilder id(Long id) { this.id = id; return this; }
        public StudentDetailResponseBuilder name(String name) { this.name = name; return this; }
        public StudentDetailResponseBuilder email(String email) { this.email = email; return this; }
        public StudentDetailResponseBuilder college(String college) { this.college = college; return this; }
        public StudentDetailResponseBuilder degree(String degree) { this.degree = degree; return this; }
        public StudentDetailResponseBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public StudentDetailResponseBuilder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public StudentDetailResponseBuilder skills(List<SkillDto> skills) { this.skills = skills; return this; }
        public StudentDetailResponseBuilder projects(List<ProjectDto> projects) { this.projects = projects; return this; }
        public StudentDetailResponseBuilder certifications(List<CertificationDto> certifications) { this.certifications = certifications; return this; }
        public StudentDetailResponseBuilder applications(List<ApplicationResponse> applications) { this.applications = applications; return this; }

        public StudentDetailResponse build() {
            return new StudentDetailResponse(id, name, email, college, degree, cgpa, graduationYear, skills, projects, certifications, applications);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }

    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }

    public List<CertificationDto> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationDto> certifications) { this.certifications = certifications; }

    public List<ApplicationResponse> getApplications() { return applications; }
    public void setApplications(List<ApplicationResponse> applications) { this.applications = applications; }

    // Nested Classes
    public static class ProjectDto {
        private String title;
        private String description;
        private List<String> skills;

        public ProjectDto() {}
        public ProjectDto(String title, String description, List<String> skills) {
            this.title = title;
            this.description = description;
            this.skills = skills;
        }

        public static ProjectDtoBuilder builder() { return new ProjectDtoBuilder(); }
        public static class ProjectDtoBuilder {
            private String title;
            private String description;
            private List<String> skills;
            public ProjectDtoBuilder title(String title) { this.title = title; return this; }
            public ProjectDtoBuilder description(String description) { this.description = description; return this; }
            public ProjectDtoBuilder skills(List<String> skills) { this.skills = skills; return this; }
            public ProjectDto build() { return new ProjectDto(title, description, skills); }
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }
    }

    public static class CertificationDto {
        private String name;
        private String provider;
        private Integer year;

        public CertificationDto() {}
        public CertificationDto(String name, String provider, Integer year) {
            this.name = name;
            this.provider = provider;
            this.year = year;
        }

        public static CertificationDtoBuilder builder() { return new CertificationDtoBuilder(); }
        public static class CertificationDtoBuilder {
            private String name;
            private String provider;
            private Integer year;
            public CertificationDtoBuilder name(String name) { this.name = name; return this; }
            public CertificationDtoBuilder provider(String provider) { this.provider = provider; return this; }
            public CertificationDtoBuilder year(Integer year) { this.year = year; return this; }
            public CertificationDto build() { return new CertificationDto(name, provider, year); }
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getProvider() { return provider; }
        public void setProvider(String provider) { this.provider = provider; }
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
    }

    public static class ApplicationResponse {
        private Long jobId;
        private String jobTitle;
        private String companyName;
        private String status;
        private String appliedDate;

        public ApplicationResponse() {}
        public ApplicationResponse(Long jobId, String jobTitle, String companyName, String status, String appliedDate) {
            this.jobId = jobId;
            this.jobTitle = jobTitle;
            this.companyName = companyName;
            this.status = status;
            this.appliedDate = appliedDate;
        }

        public static ApplicationResponseBuilder builder() { return new ApplicationResponseBuilder(); }
        public static class ApplicationResponseBuilder {
            private Long jobId;
            private String jobTitle;
            private String companyName;
            private String status;
            private String appliedDate;
            public ApplicationResponseBuilder jobId(Long jobId) { this.jobId = jobId; return this; }
            public ApplicationResponseBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
            public ApplicationResponseBuilder companyName(String companyName) { this.companyName = companyName; return this; }
            public ApplicationResponseBuilder status(String status) { this.status = status; return this; }
            public ApplicationResponseBuilder appliedDate(String appliedDate) { this.appliedDate = appliedDate; return this; }
            public ApplicationResponse build() { return new ApplicationResponse(jobId, jobTitle, companyName, status, appliedDate); }
        }

        public Long getJobId() { return jobId; }
        public void setJobId(Long jobId) { this.jobId = jobId; }
        public String getJobTitle() { return jobTitle; }
        public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getAppliedDate() { return appliedDate; }
        public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }
    }
}
