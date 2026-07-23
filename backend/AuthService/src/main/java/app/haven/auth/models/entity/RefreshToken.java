package app.haven.auth.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
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
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "refresh_tokens",
        indexes = {
                @Index(name = "idx_rt_hash", columnList = "token_hash", unique = true),
                @Index(name = "idx_rt_user", columnList = "user_id")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID refreshTokenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 255)
    private String tokenHash;

    @Column(length = 100)
    private String deviceName;

    @Column(length = 20)
    private String deviceType;

    @Column(length = 45)
    private String ipAddress;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isRevoked = false;

    private LocalDateTime revokedAt;

    @Column(length = 100)
    private String revokeReason;

    @Column(nullable = false)
    @NotNull
    private LocalDateTime expiresAt;

    private LocalDateTime lastUsedAt;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    @NotNull
    private LocalDateTime createdAt;

    public boolean isExpired() {
        return expiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isValid() {
        return !isRevoked && !isExpired();
    }

    public void revoke(String reason) {
        this.isRevoked = true;
        this.revokedAt = LocalDateTime.now();
        this.revokeReason = reason;
    }
}
