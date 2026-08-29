package com.portal.backend.repository;

import com.portal.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByJobCompanyId(Long companyId);
    Optional<Application> findByStudentIdAndJobId(Long studentId, Long jobId);
}
