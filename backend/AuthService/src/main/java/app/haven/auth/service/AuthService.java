package app.haven.auth.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import app.haven.auth.dto.RegisterRequestDTO;

@Service
@AllArgsConstructor
public class AuthService {

    private JwtService jwtService;

    public void registerUser(RegisterRequestDTO registerRequestDTO) {
        
    }
}
