package com.portal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // 'STUDENT', 'INDUSTRY', 'ACADEMIA'

    private String college;
    private String degree;
    private Double cgpa;
    private Integer graduationYear;
    private String industryType;

    // Constructors
    public User() {}

    public User(Long id, String name, String email, String password, String role, String college, String degree, Double cgpa, Integer graduationYear, String industryType) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.college = college;
        this.degree = degree;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.industryType = industryType;
    }

    // Builder pattern replacement
    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String name;
        private String email;
        private String password;
        private String role;
        private String college;
        private String degree;
        private Double cgpa;
        private Integer graduationYear;
        private String industryType;

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder name(String name) { this.name = name; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder college(String college) { this.college = college; return this; }
        public UserBuilder degree(String degree) { this.degree = degree; return this; }
        public UserBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public UserBuilder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public UserBuilder industryType(String industryType) { this.industryType = industryType; return this; }

        public User build() {
            return new User(id, name, email, password, role, college, degree, cgpa, graduationYear, industryType);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

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
