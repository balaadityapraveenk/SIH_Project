package com.portal.backend.dto;

public class GapSkillDto {
    private String name;
    private Integer requiredLevel;
    private Integer currentLevel;
    private String type; // 'Missing Skill' or 'Level Gap'
    private String suggestion;

    public GapSkillDto() {}

    public GapSkillDto(String name, Integer requiredLevel, Integer currentLevel, String type, String suggestion) {
        this.name = name;
        this.requiredLevel = requiredLevel;
        this.currentLevel = currentLevel;
        this.type = type;
        this.suggestion = suggestion;
    }

    public static GapSkillDtoBuilder builder() {
        return new GapSkillDtoBuilder();
    }

    public static class GapSkillDtoBuilder {
        private String name;
        private Integer requiredLevel;
        private Integer currentLevel;
        private String type;
        private String suggestion;

        public GapSkillDtoBuilder name(String name) { this.name = name; return this; }
        public GapSkillDtoBuilder requiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; return this; }
        public GapSkillDtoBuilder currentLevel(Integer currentLevel) { this.currentLevel = currentLevel; return this; }
        public GapSkillDtoBuilder type(String type) { this.type = type; return this; }
        public GapSkillDtoBuilder suggestion(String suggestion) { this.suggestion = suggestion; return this; }

        public GapSkillDto build() {
            return new GapSkillDto(name, requiredLevel, currentLevel, type, suggestion);
        }
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; }

    public Integer getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(Integer currentLevel) { this.currentLevel = currentLevel; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSuggestion() { return suggestion; }
    public void setSuggestion(String suggestion) { this.suggestion = suggestion; }
}
