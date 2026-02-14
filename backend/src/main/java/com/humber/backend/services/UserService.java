package com.humber.backend.services;

import com.humber.backend.models.MyUser;
import com.humber.backend.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //find user by username
    public Optional<MyUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //saves user
    public int saveUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return 0; // user already exists
        }

        //encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // validate and save the user
        validateUser(user);
        userRepository.save(user);
        return 1;// successfuly saved
    }

    //validates user before saving
    private void validateUser(MyUser user) {
        if (user.getUsername() == null) {
            throw new IllegalArgumentException("Username cannot be null");
        }
        if (user.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        if (user.getRole() == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
    }
}
