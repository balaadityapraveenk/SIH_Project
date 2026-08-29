package com.portal.backend.dto;

import java.util.List;

public class JobPostRequest {
    private String title;
    private String description;
    private String location;
    private String type;
    private String stipend;
    private Double cgpaRequired;
    private List<SkillDto> skillsRequired;

    public JobPostRequest() {}

    public JobPostRequest(String title, String description, String location, String type, String stipend, Double cgpaRequired, List<SkillDto> skillsRequired) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.type = type;
        this.stipend = stipend;
        this.cgpaRequired = cgpaRequired;
        this.skillsRequired = skillsRequired;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStipend() { return stipend; }
    public void setStipend(String stipend) { this.stipend = stipend; }

    public Double getCgpaRequired() { return cgpaRequired; }
    public void setCgpaRequired(Double cgpaRequired) { this.cgpaRequired = cgpaRequired; }

    public List<SkillDto> getSkillsRequired() { return skillsRequired; }
    public void setSkillsRequired(List<SkillDto> skillsRequired) { this.skillsRequired = skillsRequired; }
}
