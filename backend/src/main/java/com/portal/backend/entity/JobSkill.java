package com.portal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_skills")
public class JobSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "level_required", nullable = false)
    private Integer levelRequired;

    // Constructors
    public JobSkill() {}

    public JobSkill(Long id, Job job, Skill skill, Integer levelRequired) {
        this.id = id;
        this.job = job;
        this.skill = skill;
        this.levelRequired = levelRequired;
    }

    public static JobSkillBuilder builder() {
        return new JobSkillBuilder();
    }

    public static class JobSkillBuilder {
        private Long id;
        private Job job;
        private Skill skill;
        private Integer levelRequired;

        public JobSkillBuilder id(Long id) { this.id = id; return this; }
        public JobSkillBuilder job(Job job) { this.job = job; return this; }
        public JobSkillBuilder skill(Skill skill) { this.skill = skill; return this; }
        public JobSkillBuilder levelRequired(Integer levelRequired) { this.levelRequired = levelRequired; return this; }

        public JobSkill build() {
            return new JobSkill(id, job, skill, levelRequired);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public Integer getLevelRequired() { return levelRequired; }
    public void setLevelRequired(Integer levelRequired) { this.levelRequired = levelRequired; }
}
