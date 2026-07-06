package app.haven.auth.repository;

import app.haven.auth.models.entity.HotelStaffPermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelStaffPermissionRepository extends JpaRepository<HotelStaffPermission, String> {
}
