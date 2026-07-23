package app.haven.auth.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_audit_log",
        indexes = {
                @Index(name = "idx_audit_user", columnList = "user_id, created_at"),
                @Index(name = "idx_audit_action", columnList = "action, created_at")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuditLog {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID UserAuditLogId;

    @Column(nullable = false, length = 36)
    @NotBlank
    private String userId;

    // Actor (who did it) — NULL means self-action
    @Column(length = 36)
    private String actorId;

    @Column(nullable = false, length = 80)
    private String action;

    @Column(length = 50)
    private String resource;

    @Column(length = 36)
    private String resourceId;

    @Column(columnDefinition = "JSONB")
    private String oldValue;

    @Column(columnDefinition = "JSONB")
    private String newValue;

    @Column(length = 45)
    private String ipAddress;

    @Column(columnDefinition = "TEXT")
    private String userAgent;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    @NotNull
    private LocalDateTime createdAt;
}
