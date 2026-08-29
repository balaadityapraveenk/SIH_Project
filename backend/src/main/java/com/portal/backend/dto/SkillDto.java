package com.portal.backend.dto;

public class SkillDto {
    private String name;
    private Integer level;
    private String category;

    public SkillDto() {}

    public SkillDto(String name, Integer level, String category) {
        this.name = name;
        this.level = level;
        this.category = category;
    }

    public static SkillDtoBuilder builder() {
        return new SkillDtoBuilder();
    }

    public static class SkillDtoBuilder {
        private String name;
        private Integer level;
        private String category;

        public SkillDtoBuilder name(String name) { this.name = name; return this; }
        public SkillDtoBuilder level(Integer level) { this.level = level; return this; }
        public SkillDtoBuilder category(String category) { this.category = category; return this; }

        public SkillDto build() {
            return new SkillDto(name, level, category);
        }
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
