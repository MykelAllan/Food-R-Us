package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.170:3000", "https://food-r-us.vercel.app"})
@RequestMapping("/auth")
public class AuthController implements ErrorController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    //used for login
    @GetMapping("/check")
    public ResponseEntity<String> checkAuthentication() {
        return ResponseEntity.ok("User is authenticated");
    }

    //register post
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MyUser user) {
        int result = userService.saveUser(user);
        if (result == 1) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username is Already Taken");
        }
    }

    //get userRole by user
    @GetMapping("/get-role/{username}")
    public ResponseEntity<String> getUserRole(@PathVariable String username) {
        Optional<MyUser> user = userService.findByUsername(username);

        return user.map(myUser
                -> ResponseEntity.ok(myUser.getRole())).orElseGet(()
                -> ResponseEntity.badRequest().body("data: " + "user not found"));

    }

    //get userId by user
    @GetMapping("/get-id/{username}")
    public ResponseEntity<String> getUserId(@PathVariable String username) {
        Optional<MyUser> user = userService.findByUsername(username);

        return user.map(myUser
                -> ResponseEntity.ok(myUser.getId())).orElseGet(()
                -> ResponseEntity.badRequest().body("data: " + "user not found"));

    }

}
