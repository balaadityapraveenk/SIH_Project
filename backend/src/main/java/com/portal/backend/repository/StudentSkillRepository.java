package com.portal.backend.repository;

import com.portal.backend.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
    List<StudentSkill> findByStudentId(Long studentId);
    Optional<StudentSkill> findByStudentIdAndSkillId(Long studentId, Long skillId);
}
