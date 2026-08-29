package com.portal.backend.service;

import com.portal.backend.entity.*;
import com.portal.backend.repository.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final JobRepository jobRepository;
    private final JobSkillRepository jobSkillRepository;
    private final ApplicationRepository applicationRepository;

    public DatabaseSeeder(UserRepository userRepository,
                          SkillRepository skillRepository,
                          StudentSkillRepository studentSkillRepository,
                          JobRepository jobRepository,
                          JobSkillRepository jobSkillRepository,
                          ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.jobRepository = jobRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (skillRepository.count() > 0) {
            return; // Database is already seeded
        }

        System.out.println("Starting Database Seeding...");

        // 1. Seed Skills
        List<Skill> skills = new ArrayList<>();
        skills.add(new Skill(1L, "React", "Frontend"));
        skills.add(new Skill(2L, "JavaScript", "Frontend"));
        skills.add(new Skill(3L, "Tailwind CSS", "Frontend"));
        skills.add(new Skill(4L, "HTML/CSS", "Frontend"));
        skills.add(new Skill(5L, "Angular", "Frontend"));
        skills.add(new Skill(6L, "Java", "Languages"));
        skills.add(new Skill(7L, "Python", "Languages"));
        skills.add(new Skill(8L, "C++", "Languages"));
        skills.add(new Skill(9L, "Shell Scripting", "Languages"));
        skills.add(new Skill(10L, "Node.js", "Backend"));
        skills.add(new Skill(11L, "Spring Boot", "Backend"));
        skills.add(new Skill(12L, "REST APIs", "Backend"));
        skills.add(new Skill(13L, "Hibernate/JPA", "Backend"));
        skills.add(new Skill(14L, "SQL/PostgreSQL", "Database"));
        skills.add(new Skill(15L, "MongoDB", "Database"));
        skills.add(new Skill(16L, "Docker", "Cloud/DevOps"));
        skills.add(new Skill(17L, "Kubernetes", "Cloud/DevOps"));
        skills.add(new Skill(18L, "AWS", "Cloud/DevOps"));
        skills.add(new Skill(19L, "CI/CD Pipelines", "Cloud/DevOps"));
        skills.add(new Skill(20L, "Linux", "Tools"));
        skills.add(new Skill(21L, "Git", "Tools"));
        skills.add(new Skill(22L, "Machine Learning", "AI/ML"));
        skills.add(new Skill(23L, "Data Visualization", "AI/ML"));
        skills.add(new Skill(24L, "Pandas/NumPy", "Languages"));
        skills.add(new Skill(25L, "Statistics", "Academic"));
        skills.add(new Skill(26L, "Data Structures", "Academic"));
        skills.add(new Skill(27L, "DBMS", "Academic"));
        skills.add(new Skill(28L, "Communication Skills", "Soft Skills"));
        skills.add(new Skill(29L, "Problem Solving", "Soft Skills"));

        skillRepository.saveAll(skills);

        // 2. Seed Users
        // Student 1: Aarav Sharma
        User aarav = User.builder()
                .name("Aarav Sharma")
                .email("aarav.sharma@nit.edu")
                .password("password") // simple password for testing
                .role("student")
                .college("National Institute of Technology")
                .degree("B.Tech Computer Science")
                .cgpa(8.7)
                .graduationYear(2027)
                .build();
        userRepository.save(aarav);

        // Student 2: Priya Patel
        User priya = User.builder()
                .name("Priya Patel")
                .email("priya.patel@nit.edu")
                .password("password")
                .role("student")
                .college("National Institute of Technology")
                .degree("B.Tech Information Technology")
                .cgpa(9.1)
                .graduationYear(2027)
                .build();
        userRepository.save(priya);

        // Company 1: TechCorp Solutions
        User techcorp = User.builder()
                .name("TechCorp Solutions")
                .email("careers@techcorp.com")
                .password("password")
                .role("industry")
                .industryType("IT & Cloud Services")
                .build();
        userRepository.save(techcorp);

        // Company 2: DataDynamo Inc.
        User datadynamo = User.builder()
                .name("DataDynamo Inc.")
                .email("talent@datadynamo.ai")
                .password("password")
                .role("industry")
                .industryType("Analytics & AI")
                .build();
        userRepository.save(datadynamo);

        // Company 3: FinTech Hub
        User fintech = User.builder()
                .name("FinTech Hub")
                .email("jobs@fintechhub.co")
                .password("password")
                .role("industry")
                .industryType("Finance & Software")
                .build();
        userRepository.save(fintech);

        // Academia Admin
        User academia = User.builder()
                .name("Prof. Ram Prasad (Placement Head)")
                .email("placement@nit.edu")
                .password("password")
                .role("academia")
                .college("National Institute of Technology")
                .build();
        userRepository.save(academia);

        // 3. Seed Student Skills
        // Aarav skills
        mapStudentSkill(aarav, 1L, 75); // React
        mapStudentSkill(aarav, 2L, 80); // JS
        mapStudentSkill(aarav, 3L, 70); // Tailwind
        mapStudentSkill(aarav, 4L, 85); // HTML/CSS
        mapStudentSkill(aarav, 10L, 60); // Node
        mapStudentSkill(aarav, 14L, 65); // SQL
        mapStudentSkill(aarav, 21L, 75); // Git
        mapStudentSkill(aarav, 26L, 80); // DS
        mapStudentSkill(aarav, 28L, 85); // Communication

        // Priya skills
        mapStudentSkill(priya, 7L, 80); // Python
        mapStudentSkill(priya, 6L, 75); // Java
        mapStudentSkill(priya, 14L, 80); // SQL
        mapStudentSkill(priya, 24L, 75); // Pandas
        mapStudentSkill(priya, 25L, 80); // Stats
        mapStudentSkill(priya, 27L, 85); // DBMS
        mapStudentSkill(priya, 21L, 70); // Git
        mapStudentSkill(priya, 28L, 75); // Communication
        mapStudentSkill(priya, 29L, 80); // Problem Solving

        // 4. Seed Jobs
        // Job 1: Frontend Developer Intern (TechCorp)
        Job job1 = Job.builder()
                .title("Frontend Developer Intern")
                .description("Looking for an energetic React intern who understands state management, component lifecycles, and custom styling. You will collaborate on custom client dashboards.")
                .company(techcorp)
                .location("Remote")
                .type("Internship")
                .stipend("25000")
                .cgpaRequired(7.5)
                .build();
        jobRepository.save(job1);

        mapJobSkill(job1, 1L, 70); // React
        mapJobSkill(job1, 2L, 75); // JS
        mapJobSkill(job1, 3L, 65); // Tailwind

        // Job 2: Junior Data Analyst (DataDynamo)
        Job job2 = Job.builder()
                .title("Junior Data Analyst")
                .description("Analyze large business datasets to derive actionable insights. Must be comfortable cleaning raw data, executing database queries, and presenting summaries to team leads.")
                .company(datadynamo)
                .location("Bangalore")
                .type("Full-Time")
                .stipend("800000")
                .cgpaRequired(8.0)
                .build();
        jobRepository.save(job2);

        mapJobSkill(job2, 7L, 75); // Python
        mapJobSkill(job2, 14L, 80); // SQL
        mapJobSkill(job2, 23L, 70); // Data Viz
        mapJobSkill(job2, 25L, 65); // Stats

        // Job 3: Spring Boot Developer (FinTech)
        Job job3 = Job.builder()
                .title("Spring Boot Developer")
                .description("Build robust transaction microservices. Strong Java fundamentals, understanding of MVC architecture, JPA/Hibernate, and relational database schema design are key.")
                .company(fintech)
                .location("Mumbai")
                .type("Full-Time")
                .stipend("1050000")
                .cgpaRequired(8.0)
                .build();
        jobRepository.save(job3);

        mapJobSkill(job3, 6L, 80); // Java
        mapJobSkill(job3, 11L, 75); // Spring Boot
        mapJobSkill(job3, 14L, 75); // SQL
        mapJobSkill(job3, 12L, 70); // REST API

        // 5. Seed Applications
        applicationRepository.save(new Application(null, aarav, job1, "Shortlisted", LocalDate.of(2026, 8, 15)));
        applicationRepository.save(new Application(null, aarav, job3, "Applied", LocalDate.of(2026, 8, 20)));
        applicationRepository.save(new Application(null, priya, job2, "Interviewing", LocalDate.of(2026, 8, 18)));

        System.out.println("Database Seeding Completed Successfully.");
    }

    private void mapStudentSkill(User student, Long skillId, int level) {
        Skill skill = skillRepository.findById(skillId).orElse(null);
        if (skill != null) {
            studentSkillRepository.save(new StudentSkill(null, student, skill, level));
        }
    }

    private void mapJobSkill(Job job, Long skillId, int level) {
        Skill skill = skillRepository.findById(skillId).orElse(null);
        if (skill != null) {
            jobSkillRepository.save(new JobSkill(null, job, skill, level));
        }
    }
}
