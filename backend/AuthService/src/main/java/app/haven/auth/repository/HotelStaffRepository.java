package app.haven.auth.repository;

import app.haven.auth.models.entity.HotelStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelStaffRepository extends JpaRepository<HotelStaff, String> {
}
