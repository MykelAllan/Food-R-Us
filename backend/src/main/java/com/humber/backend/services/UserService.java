package com.humber.backend.services;

import com.humber.backend.models.MyUser;
import com.humber.backend.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //saves user
    public int saveUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return 0; // user already exists
        }

        //encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // save the user
        userRepository.save(user);
        return 1;// successfuly saved
    }
}
