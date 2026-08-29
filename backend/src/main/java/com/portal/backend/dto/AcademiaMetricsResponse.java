package com.portal.backend.dto;

import java.util.List;

public class AcademiaMetricsResponse {
    private Integer totalStudents;
    private List<SkillAggregateDto> skillAggregates;
    private List<CurriculumGapDto> curriculumGaps;
    private Integer placementRate;
    private Integer activeCollabCompanies;

    public AcademiaMetricsResponse() {}

    public AcademiaMetricsResponse(Integer totalStudents, List<SkillAggregateDto> skillAggregates, List<CurriculumGapDto> curriculumGaps, Integer placementRate, Integer activeCollabCompanies) {
        this.totalStudents = totalStudents;
        this.skillAggregates = skillAggregates;
        this.curriculumGaps = curriculumGaps;
        this.placementRate = placementRate;
        this.activeCollabCompanies = activeCollabCompanies;
    }

    public static AcademiaMetricsResponseBuilder builder() {
        return new AcademiaMetricsResponseBuilder();
    }

    public static class AcademiaMetricsResponseBuilder {
        private Integer totalStudents;
        private List<SkillAggregateDto> skillAggregates;
        private List<CurriculumGapDto> curriculumGaps;
        private Integer placementRate;
        private Integer activeCollabCompanies;

        public AcademiaMetricsResponseBuilder totalStudents(Integer totalStudents) { this.totalStudents = totalStudents; return this; }
        public AcademiaMetricsResponseBuilder skillAggregates(List<SkillAggregateDto> skillAggregates) { this.skillAggregates = skillAggregates; return this; }
        public AcademiaMetricsResponseBuilder curriculumGaps(List<CurriculumGapDto> curriculumGaps) { this.curriculumGaps = curriculumGaps; return this; }
        public AcademiaMetricsResponseBuilder placementRate(Integer placementRate) { this.placementRate = placementRate; return this; }
        public AcademiaMetricsResponseBuilder activeCollabCompanies(Integer activeCollabCompanies) { this.activeCollabCompanies = activeCollabCompanies; return this; }

        public AcademiaMetricsResponse build() {
            return new AcademiaMetricsResponse(totalStudents, skillAggregates, curriculumGaps, placementRate, activeCollabCompanies);
        }
    }

    // Getters and Setters
    public Integer getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Integer totalStudents) { this.totalStudents = totalStudents; }

    public List<SkillAggregateDto> getSkillAggregates() { return skillAggregates; }
    public void setSkillAggregates(List<SkillAggregateDto> skillAggregates) { this.skillAggregates = skillAggregates; }

    public List<CurriculumGapDto> getCurriculumGaps() { return curriculumGaps; }
    public void setCurriculumGaps(List<CurriculumGapDto> curriculumGaps) { this.curriculumGaps = curriculumGaps; }

    public Integer getPlacementRate() { return placementRate; }
    public void setPlacementRate(Integer placementRate) { this.placementRate = placementRate; }

    public Integer getActiveCollabCompanies() { return activeCollabCompanies; }
    public void setActiveCollabCompanies(Integer activeCollabCompanies) { this.activeCollabCompanies = activeCollabCompanies; }
}
