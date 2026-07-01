package app.haven.hotel.controller;

import app.haven.hotel.models.entity.Hotel;
import app.haven.hotel.service.HotelService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/hotel")
public class PublicHotelController {

    private final HotelService hotelService;

    PublicHotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/")
    public ResponseEntity<Page<Hotel>> getHotelsByPage(@RequestParam(defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page, 10);
        Page<Hotel> hotels = hotelService.getHotelsByPage(pageable);
        return ResponseEntity.ok(hotels);
    }

}
