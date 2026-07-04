package app.haven.auth.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_roles",
        indexes = {
                @Index(name = "idx_ur_user", columnList = "user_id"),
                @Index(name = "idx_ur_role", columnList = "role_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_user_role",
                        columnNames = {
                                "user_id",
                                "role_id"
                        }
                )
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRole {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "assigned_by", length = 36)
    private String assignedBy;

    @Column(name = "assigned_at", nullable = false)
    @CreatedDate
    private LocalDateTime assignedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    public boolean isExpired() {
        return expiresAt != null && expiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isEffective() {
        return isActive && !isExpired();
    }

    public void revoke() {
        this.isActive = false;
    }
}
