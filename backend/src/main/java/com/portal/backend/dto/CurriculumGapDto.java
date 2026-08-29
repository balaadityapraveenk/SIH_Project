package com.portal.backend.dto;

public class CurriculumGapDto {
    private String skillName;
    private Integer industryDemandFreq;
    private Integer studentReach;
    private Integer averageCollegeLevel;
    private Integer gapScore;

    public CurriculumGapDto() {}

    public CurriculumGapDto(String skillName, Integer industryDemandFreq, Integer studentReach, Integer averageCollegeLevel, Integer gapScore) {
        this.skillName = skillName;
        this.industryDemandFreq = industryDemandFreq;
        this.studentReach = studentReach;
        this.averageCollegeLevel = averageCollegeLevel;
        this.gapScore = gapScore;
    }

    public static CurriculumGapDtoBuilder builder() {
        return new CurriculumGapDtoBuilder();
    }

    public static class CurriculumGapDtoBuilder {
        private String skillName;
        private Integer industryDemandFreq;
        private Integer studentReach;
        private Integer averageCollegeLevel;
        private Integer gapScore;

        public CurriculumGapDtoBuilder skillName(String skillName) { this.skillName = skillName; return this; }
        public CurriculumGapDtoBuilder industryDemandFreq(Integer industryDemandFreq) { this.industryDemandFreq = industryDemandFreq; return this; }
        public CurriculumGapDtoBuilder studentReach(Integer studentReach) { this.studentReach = studentReach; return this; }
        public CurriculumGapDtoBuilder averageCollegeLevel(Integer averageCollegeLevel) { this.averageCollegeLevel = averageCollegeLevel; return this; }
        public CurriculumGapDtoBuilder gapScore(Integer gapScore) { this.gapScore = gapScore; return this; }

        public CurriculumGapDto build() {
            return new CurriculumGapDto(skillName, industryDemandFreq, studentReach, averageCollegeLevel, gapScore);
        }
    }

    // Getters and Setters
    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public Integer getIndustryDemandFreq() { return industryDemandFreq; }
    public void setIndustryDemandFreq(Integer industryDemandFreq) { this.industryDemandFreq = industryDemandFreq; }

    public Integer getStudentReach() { return studentReach; }
    public void setStudentReach(Integer studentReach) { this.studentReach = studentReach; }

    public Integer getAverageCollegeLevel() { return averageCollegeLevel; }
    public void setAverageCollegeLevel(Integer averageCollegeLevel) { this.averageCollegeLevel = averageCollegeLevel; }

    public Integer getGapScore() { return gapScore; }
    public void setGapScore(Integer gapScore) { this.gapScore = gapScore; }
}
