package app.haven.auth.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPlatformRole {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID userPlatformRoleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_role_id", nullable = false)
    private PlatformRole platformRole;

    @Column(length = 36)
    private String assignedBy;

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    private LocalDateTime expiresAt;

    @Column(nullable = false)
    @Builder.Default
    @NotNull
    private Boolean isActive = true;

    public boolean isEffective() {
        return isActive &&
                (expiresAt == null || expiresAt.isAfter(LocalDateTime.now()));
    }
}
