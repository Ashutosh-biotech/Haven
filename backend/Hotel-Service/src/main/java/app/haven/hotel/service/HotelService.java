package app.haven.hotel.service;

import app.haven.hotel.models.entity.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HotelService {

    Page<Hotel> getHotelsByPage(Pageable pageable);

}
