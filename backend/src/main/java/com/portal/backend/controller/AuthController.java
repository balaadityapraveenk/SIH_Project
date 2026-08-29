package com.portal.backend.controller;

import com.portal.backend.dto.LoginRequest;
import com.portal.backend.dto.LoginResponse;
import com.portal.backend.entity.User;
import com.portal.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered.");
        }
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> optUser = userRepository.findByEmail(request.getEmail());
        if (optUser.isEmpty() || !optUser.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        User user = optUser.get();
        LoginResponse response = LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .college(user.getCollege())
                .degree(user.getDegree())
                .cgpa(user.getCgpa())
                .graduationYear(user.getGraduationYear())
                .industryType(user.getIndustryType())
                .build();

        return ResponseEntity.ok(response);
    }
}
