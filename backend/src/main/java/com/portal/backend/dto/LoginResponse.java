package com.portal.backend.dto;

public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String college;
    private String degree;
    private Double cgpa;
    private Integer graduationYear;
    private String industryType;

    public LoginResponse() {}

    public LoginResponse(Long id, String name, String email, String role, String college, String degree, Double cgpa, Integer graduationYear, String industryType) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.college = college;
        this.degree = degree;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.industryType = industryType;
    }

    public static LoginResponseBuilder builder() {
        return new LoginResponseBuilder();
    }

    public static class LoginResponseBuilder {
        private Long id;
        private String name;
        private String email;
        private String role;
        private String college;
        private String degree;
        private Double cgpa;
        private Integer graduationYear;
        private String industryType;

        public LoginResponseBuilder id(Long id) { this.id = id; return this; }
        public LoginResponseBuilder name(String name) { this.name = name; return this; }
        public LoginResponseBuilder email(String email) { this.email = email; return this; }
        public LoginResponseBuilder role(String role) { this.role = role; return this; }
        public LoginResponseBuilder college(String college) { this.college = college; return this; }
        public LoginResponseBuilder degree(String degree) { this.degree = degree; return this; }
        public LoginResponseBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public LoginResponseBuilder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public LoginResponseBuilder industryType(String industryType) { this.industryType = industryType; return this; }

        public LoginResponse build() {
            return new LoginResponse(id, name, email, role, college, degree, cgpa, graduationYear, industryType);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public String getIndustryType() { return industryType; }
    public void setIndustryType(String industryType) { this.industryType = industryType; }
}
