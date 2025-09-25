package org.joy.backend.config;

import lombok.RequiredArgsConstructor;
import org.joy.backend.models.Role;
import org.joy.backend.models.User;
import org.joy.backend.repository.RoleRepository;
import org.joy.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (roleRepo.findByName("ADMIN").isEmpty()) {
            roleRepo.save(Role.builder().name("ADMIN").build());
        }
        if (roleRepo.findByName("PLAYER").isEmpty()) {
            roleRepo.save(Role.builder().name("PLAYER").build());
        }
        if (!userRepo.existsByUsername("admin")) {
            Role adminRole = roleRepo.findByName("ADMIN").orElseThrow();
            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .roles(Set.of(adminRole))
                    .build();
            userRepo.save(admin);
            System.out.println("Admin user created: admin / Admin@123");
        }
    }
}
