package com.portal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_skills")
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = false)
    private Integer level;

    // Constructors
    public StudentSkill() {}

    public StudentSkill(Long id, User student, Skill skill, Integer level) {
        this.id = id;
        this.student = student;
        this.skill = skill;
        this.level = level;
    }

    public static StudentSkillBuilder builder() {
        return new StudentSkillBuilder();
    }

    public static class StudentSkillBuilder {
        private Long id;
        private User student;
        private Skill skill;
        private Integer level;

        public StudentSkillBuilder id(Long id) { this.id = id; return this; }
        public StudentSkillBuilder student(User student) { this.student = student; return this; }
        public StudentSkillBuilder skill(Skill skill) { this.skill = skill; return this; }
        public StudentSkillBuilder level(Integer level) { this.level = level; return this; }

        public StudentSkill build() {
            return new StudentSkill(id, student, skill, level);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
}
