package app.haven.auth.controller;

import app.haven.auth.dto.LoginRequestDTO;
import app.haven.auth.dto.RegisterRequestDTO;
import app.haven.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/auth")
@AllArgsConstructor
public class AuthPublicController {

    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> loginRequest(@RequestBody @Valid LoginRequestDTO loginRequestDTO){
        return ResponseEntity.ok("pass");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerRequest(@RequestBody @Valid RegisterRequestDTO registerRequestDTO){
        authService.registerUser(registerRequestDTO);
        return ResponseEntity.ok("pass");
    }
}
