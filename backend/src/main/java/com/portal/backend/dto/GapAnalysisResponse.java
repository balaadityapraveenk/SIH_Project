package com.portal.backend.dto;

import java.util.List;

public class GapAnalysisResponse {
    private String roleTitle;
    private Integer matchPercentage;
    private List<SkillDto> matchingSkills;
    private List<GapSkillDto> gapSkills;
    private List<String> suggestions;

    public GapAnalysisResponse() {}

    public GapAnalysisResponse(String roleTitle, Integer matchPercentage, List<SkillDto> matchingSkills, List<GapSkillDto> gapSkills, List<String> suggestions) {
        this.roleTitle = roleTitle;
        this.matchPercentage = matchPercentage;
        this.matchingSkills = matchingSkills;
        this.gapSkills = gapSkills;
        this.suggestions = suggestions;
    }

    public static GapAnalysisResponseBuilder builder() {
        return new GapAnalysisResponseBuilder();
    }

    public static class GapAnalysisResponseBuilder {
        private String roleTitle;
        private Integer matchPercentage;
        private List<SkillDto> matchingSkills;
        private List<GapSkillDto> gapSkills;
        private List<String> suggestions;

        public GapAnalysisResponseBuilder roleTitle(String roleTitle) { this.roleTitle = roleTitle; return this; }
        public GapAnalysisResponseBuilder matchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; return this; }
        public GapAnalysisResponseBuilder matchingSkills(List<SkillDto> matchingSkills) { this.matchingSkills = matchingSkills; return this; }
        public GapAnalysisResponseBuilder gapSkills(List<GapSkillDto> gapSkills) { this.gapSkills = gapSkills; return this; }
        public GapAnalysisResponseBuilder suggestions(List<String> suggestions) { this.suggestions = suggestions; return this; }

        public GapAnalysisResponse build() {
            return new GapAnalysisResponse(roleTitle, matchPercentage, matchingSkills, gapSkills, suggestions);
        }
    }

    // Getters and Setters
    public String getRoleTitle() { return roleTitle; }
    public void setRoleTitle(String roleTitle) { this.roleTitle = roleTitle; }

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<SkillDto> getMatchingSkills() { return matchingSkills; }
    public void setMatchingSkills(List<SkillDto> matchingSkills) { this.matchingSkills = matchingSkills; }

    public List<GapSkillDto> getGapSkills() { return gapSkills; }
    public void setGapSkills(List<GapSkillDto> gapSkills) { this.gapSkills = gapSkills; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
}
