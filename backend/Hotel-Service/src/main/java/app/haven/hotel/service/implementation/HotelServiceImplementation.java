package app.haven.hotel.service.implementation;

import app.haven.hotel.models.entity.Hotel;
import app.haven.hotel.repository.HotelRepository;
import app.haven.hotel.service.HotelService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HotelServiceImplementation implements HotelService {

    private final HotelRepository hotelRepository;

    public HotelServiceImplementation(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @Override
    public Page<Hotel> getHotelsByPage(Pageable pageable) {
        return hotelRepository.findAll(pageable);
    }
}
