package app.haven.auth.repository;

import app.haven.auth.models.entity.HotelStaffPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HotelStaffPermissionRepository extends JpaRepository<HotelStaffPermission, UUID> {
}
