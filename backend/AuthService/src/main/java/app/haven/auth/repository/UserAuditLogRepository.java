package app.haven.auth.repository;

import app.haven.auth.models.entity.UserAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuditLogRepository extends JpaRepository<UserAuditLog, String> {
}
