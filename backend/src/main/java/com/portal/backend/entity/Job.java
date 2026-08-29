package com.portal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private User company;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String type; // 'Internship', 'Full-Time'

    @Column(nullable = false)
    private String stipend;

    @Column(name = "cgpa_required", nullable = false)
    private Double cgpaRequired;

    // Constructors
    public Job() {}

    public Job(Long id, String title, String description, User company, String location, String type, String stipend, Double cgpaRequired) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.company = company;
        this.location = location;
        this.type = type;
        this.stipend = stipend;
        this.cgpaRequired = cgpaRequired;
    }

    public static JobBuilder builder() {
        return new JobBuilder();
    }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String description;
        private User company;
        private String location;
        private String type;
        private String stipend;
        private Double cgpaRequired;

        public JobBuilder id(Long id) { this.id = id; return this; }
        public JobBuilder title(String title) { this.title = title; return this; }
        public JobBuilder description(String description) { this.description = description; return this; }
        public JobBuilder company(User company) { this.company = company; return this; }
        public JobBuilder location(String location) { this.location = location; return this; }
        public JobBuilder type(String type) { this.type = type; return this; }
        public JobBuilder stipend(String stipend) { this.stipend = stipend; return this; }
        public JobBuilder cgpaRequired(Double cgpaRequired) { this.cgpaRequired = cgpaRequired; return this; }

        public Job build() {
            return new Job(id, title, description, company, location, type, stipend, cgpaRequired);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getCompany() { return company; }
    public void setCompany(User company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStipend() { return stipend; }
    public void setStipend(String stipend) { this.stipend = stipend; }

    public Double getCgpaRequired() { return cgpaRequired; }
    public void setCgpaRequired(Double cgpaRequired) { this.cgpaRequired = cgpaRequired; }
}
