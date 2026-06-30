package app.haven.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/hotel")
public class PublicHotelController {

    @GetMapping("/")
    public ResponseEntity<?> getPublicHotel(){
        return ResponseEntity.ok(Map.of("status", "This is hotel service"));
    }

}
