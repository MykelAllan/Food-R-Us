package com.humber.backend.controllers;

import com.humber.backend.models.LoginRequest;
import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://food-r-us.vercel.app"})
@RequestMapping("/auth")
public class AuthController implements ErrorController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    //logout
    @GetMapping("/logout")
    public String customLogout(HttpServletRequest request,
                               HttpServletResponse response,
                               Authentication authentication) {
        //logout logic
        new SecurityContextLogoutHandler().logout(request, response, authentication);

        return "redirect:/login?logout=You have been logged out successfully!";
    }

    //register post
    @PostMapping("/register")
    public String register(@RequestBody MyUser user) {
        int result = userService.saveUser(user);
        if (result == 1) {
            return "User registered successfully";
        } else {
            return "Username already exists";
        }
    }

    //login post
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            Authentication authentication = authenticationManager.authenticate(authToken);
            // If authentication is successful, you can return a token or success message
            return "Login successful: " + authentication;
        } catch (AuthenticationException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return "Login failed: " + e.getMessage();
        }
    }

    //get userRole from user
    @GetMapping("/get-role/{username}")
    public ResponseEntity<String> getUserRole(@PathVariable String username) {
        Optional<MyUser> user = userService.findByUsername(username);

        return user.map(myUser
                -> ResponseEntity.ok(myUser.getRole())).orElseGet(()
                -> ResponseEntity.badRequest().body("data: " + "user not found"));

    }

    //get userId from user
    @GetMapping("/get-id/{username}")
    public ResponseEntity<String> getUserId(@PathVariable String username) {
        Optional<MyUser> user = userService.findByUsername(username);

        return user.map(myUser
                -> ResponseEntity.ok(myUser.getId())).orElseGet(()
                -> ResponseEntity.badRequest().body("data: " + "user not found"));

    }


    @GetMapping("/check")
    public Map<String, String> checkAuthentication() {
        Map<String, String> result = new HashMap<>();
        result.put("message", "User is authenticated");
        return result;
    }
}
