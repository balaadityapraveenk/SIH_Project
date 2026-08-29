package com.portal.backend.dto;

public class SkillAggregateDto {
    private String name;
    private Long studentCount;
    private Integer averageLevel;

    public SkillAggregateDto() {}

    public SkillAggregateDto(String name, Long studentCount, Integer averageLevel) {
        this.name = name;
        this.studentCount = studentCount;
        this.averageLevel = averageLevel;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getStudentCount() { return studentCount; }
    public void setStudentCount(Long studentCount) { this.studentCount = studentCount; }

    public Integer getAverageLevel() { return averageLevel; }
    public void setAverageLevel(Integer averageLevel) { this.averageLevel = averageLevel; }
}
