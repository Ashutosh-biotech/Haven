package app.haven.auth.repository;

import app.haven.auth.models.entity.HotelRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HotelRoleRepository extends JpaRepository<HotelRole, UUID> {
}
