package com.portal.backend.service;

import com.portal.backend.entity.JobSkill;
import com.portal.backend.entity.StudentSkill;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchingService {

    public int calculateMatchScore(List<StudentSkill> studentSkills, List<JobSkill> jobSkillsRequired) {
        if (jobSkillsRequired == null || jobSkillsRequired.isEmpty()) {
            return 100;
        }

        double totalScore = 0.0;

        for (JobSkill req : jobSkillsRequired) {
            String reqName = req.getSkill().getName().toLowerCase();
            StudentSkill studentSkill = studentSkills.stream()
                    .filter(s -> s.getSkill().getName().toLowerCase().equals(reqName))
                    .findFirst()
                    .orElse(null);

            if (studentSkill != null) {
                if (studentSkill.getLevel() >= req.getLevelRequired()) {
                    totalScore += 100.0;
                } else {
                    totalScore += ((double) studentSkill.getLevel() / req.getLevelRequired()) * 100.0;
                }
            }
        }

        return (int) Math.round(totalScore / (jobSkillsRequired.isEmpty() ? 1.0 : jobSkillsRequired.size()));
    }
}
