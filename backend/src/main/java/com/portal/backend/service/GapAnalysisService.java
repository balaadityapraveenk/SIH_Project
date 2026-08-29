package com.portal.backend.service;

import com.portal.backend.dto.GapAnalysisResponse;
import com.portal.backend.dto.GapSkillDto;
import com.portal.backend.dto.SkillDto;
import com.portal.backend.entity.StudentSkill;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GapAnalysisService {

    private static final Map<String, StandardRole> STANDARD_ROLES = new HashMap<>();

    static {
        STANDARD_ROLES.put("fullstack", new StandardRole("Full Stack Developer", List.of(
            new RoleSkillRequirement("React", 80, "Frontend"),
            new RoleSkillRequirement("JavaScript", 80, "Frontend"),
            new RoleSkillRequirement("Node.js", 75, "Backend"),
            new RoleSkillRequirement("SQL/PostgreSQL", 70, "Database"),
            new RoleSkillRequirement("Git", 70, "Tools"),
            new RoleSkillRequirement("Tailwind CSS", 75, "Frontend")
        )));

        STANDARD_ROLES.put("datascientist", new StandardRole("Data Scientist", List.of(
            new RoleSkillRequirement("Python", 85, "Languages"),
            new RoleSkillRequirement("SQL/PostgreSQL", 75, "Database"),
            new RoleSkillRequirement("Machine Learning", 80, "AI/ML"),
            new RoleSkillRequirement("Data Visualization", 75, "AI/ML"),
            new RoleSkillRequirement("Pandas/NumPy", 80, "Languages"),
            new RoleSkillRequirement("Statistics", 70, "Academic")
        )));

        STANDARD_ROLES.put("devops", new StandardRole("DevOps Engineer", List.of(
            new RoleSkillRequirement("Linux", 80, "Tools"),
            new RoleSkillRequirement("Docker", 80, "Cloud/DevOps"),
            new RoleSkillRequirement("Kubernetes", 70, "Cloud/DevOps"),
            new RoleSkillRequirement("AWS", 75, "Cloud/DevOps"),
            new RoleSkillRequirement("CI/CD Pipelines", 75, "Cloud/DevOps"),
            new RoleSkillRequirement("Shell Scripting", 70, "Languages")
        )));

        STANDARD_ROLES.put("backend", new StandardRole("Java Backend Engineer", List.of(
            new RoleSkillRequirement("Java", 85, "Languages"),
            new RoleSkillRequirement("Spring Boot", 80, "Backend"),
            new RoleSkillRequirement("SQL/PostgreSQL", 80, "Database"),
            new RoleSkillRequirement("REST APIs", 80, "Backend"),
            new RoleSkillRequirement("Docker", 60, "Cloud/DevOps"),
            new RoleSkillRequirement("Hibernate/JPA", 75, "Backend")
        )));
    }

    public GapAnalysisResponse performGapAnalysis(List<StudentSkill> studentSkills, String targetRoleId) {
        StandardRole role = STANDARD_ROLES.get(targetRoleId.toLowerCase());
        if (role == null) {
            return null;
        }

        List<SkillDto> matchingSkills = new ArrayList<>();
        List<GapSkillDto> gapSkills = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();

        for (RoleSkillRequirement reqSkill : role.skills) {
            StudentSkill studentSkill = studentSkills.stream()
                    .filter(s -> s.getSkill().getName().equalsIgnoreCase(reqSkill.name))
                    .findFirst()
                    .orElse(null);

            if (studentSkill == null) {
                String suggestion = "Start learning fundamentals of " + reqSkill.name + ". Recommended: documentation, online courses.";
                gapSkills.add(GapSkillDto.builder()
                        .name(reqSkill.name)
                        .requiredLevel(reqSkill.level)
                        .currentLevel(0)
                        .type("Missing Skill")
                        .suggestion(suggestion)
                        .build());
                suggestions.add(suggestion);
            } else if (studentSkill.getLevel() < reqSkill.level) {
                String suggestion = "Upgrade your proficiency in " + reqSkill.name + " from level " + studentSkill.getLevel() + "% to " + reqSkill.level + "%. Work on projects using this skill.";
                gapSkills.add(GapSkillDto.builder()
                        .name(reqSkill.name)
                        .requiredLevel(reqSkill.level)
                        .currentLevel(studentSkill.getLevel())
                        .type("Level Gap")
                        .suggestion(suggestion)
                        .build());
                suggestions.add(suggestion);
            } else {
                matchingSkills.add(SkillDto.builder()
                        .name(reqSkill.name)
                        .level(studentSkill.getLevel())
                        .category(reqSkill.category)
                        .build());
            }
        }

        int totalRoleSkills = role.skills.size();
        int matchPercentage = totalRoleSkills > 0 
                ? (int) Math.round(((double) matchingSkills.size() / totalRoleSkills) * 100.0)
                : 100;

        return GapAnalysisResponse.builder()
                .roleTitle(role.title)
                .matchPercentage(matchPercentage)
                .matchingSkills(matchingSkills)
                .gapSkills(gapSkills)
                .suggestions(suggestions)
                .build();
    }

    private static class StandardRole {
        String title;
        List<RoleSkillRequirement> skills;

        StandardRole(String title, List<RoleSkillRequirement> skills) {
            this.title = title;
            this.skills = skills;
        }
    }

    private static class RoleSkillRequirement {
        String name;
        int level;
        String category;

        RoleSkillRequirement(String name, int level, String category) {
            this.name = name;
            this.level = level;
            this.category = category;
        }
    }
}
