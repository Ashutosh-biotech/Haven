package app.haven.gateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/public")
public class GatewayController {

    @GetMapping("/health")
    public ResponseEntity<?> health(){
        return ResponseEntity.ok(Map.of("Status", "EVERY THING LOOKS GOOD IN GATEWAY!"));
    }
}
