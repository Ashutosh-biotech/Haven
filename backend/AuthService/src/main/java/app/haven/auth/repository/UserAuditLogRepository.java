package app.haven.auth.repository;

import app.haven.auth.models.entity.UserAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserAuditLogRepository extends JpaRepository<UserAuditLog, UUID> {
}
