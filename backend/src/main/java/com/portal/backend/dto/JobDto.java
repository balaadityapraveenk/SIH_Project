package com.portal.backend.dto;

import java.util.List;

public class JobDto {
    private Long id;
    private String title;
    private String description;
    private Long companyId;
    private String companyName;
    private String location;
    private String type;
    private String stipend;
    private Double cgpaRequired;
    private List<SkillDto> skillsRequired;
    private Integer matchPercentage;

    public JobDto() {}

    public JobDto(Long id, String title, String description, Long companyId, String companyName, String location, String type, String stipend, Double cgpaRequired, List<SkillDto> skillsRequired, Integer matchPercentage) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.companyId = companyId;
        this.companyName = companyName;
        this.location = location;
        this.type = type;
        this.stipend = stipend;
        this.cgpaRequired = cgpaRequired;
        this.skillsRequired = skillsRequired;
        this.matchPercentage = matchPercentage;
    }

    public static JobDtoBuilder builder() {
        return new JobDtoBuilder();
    }

    public static class JobDtoBuilder {
        private Long id;
        private String title;
        private String description;
        private Long companyId;
        private String companyName;
        private String location;
        private String type;
        private String stipend;
        private Double cgpaRequired;
        private List<SkillDto> skillsRequired;
        private Integer matchPercentage;

        public JobDtoBuilder id(Long id) { this.id = id; return this; }
        public JobDtoBuilder title(String title) { this.title = title; return this; }
        public JobDtoBuilder description(String description) { this.description = description; return this; }
        public JobDtoBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public JobDtoBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public JobDtoBuilder location(String location) { this.location = location; return this; }
        public JobDtoBuilder type(String type) { this.type = type; return this; }
        public JobDtoBuilder stipend(String stipend) { this.stipend = stipend; return this; }
        public JobDtoBuilder cgpaRequired(Double cgpaRequired) { this.cgpaRequired = cgpaRequired; return this; }
        public JobDtoBuilder skillsRequired(List<SkillDto> skillsRequired) { this.skillsRequired = skillsRequired; return this; }
        public JobDtoBuilder matchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; return this; }

        public JobDto build() {
            return new JobDto(id, title, description, companyId, companyName, location, type, stipend, cgpaRequired, skillsRequired, matchPercentage);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

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

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }
}
