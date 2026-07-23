package app.haven.auth.models.entity;

import app.haven.auth.models.enums.OtpPurpose;
import jakarta.persistence.CheckConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
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
        name = "user_otp",
        indexes = {
                @Index(name = "idx_otp_user", columnList = "user_id")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOtp {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID userOtpId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255)
    private String otpHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private OtpPurpose purpose;

    @Column(
            check = {
                    @CheckConstraint(
                            name = "chk_otp_hotel_invite",
                            constraint = "purpose != 'HOTEL_INVITE' OR context_id IS NOT NULL"
                    )
            }
    )
    private String contextId;

    @Column(nullable = false, length = 255)
    private String deliveryTarget;

    @Column(nullable = false)
    @Builder.Default
    private Integer attempts = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer maxAttempts = 3;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isUsed = false;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime usedAt;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

    public boolean isExhausted() {
        return attempts >= maxAttempts;
    }

    public boolean isUsable() {
        return !isUsed && !isExpired() && !isExhausted();
    }

    public void markUsed() {
        this.isUsed = true;
        this.usedAt = LocalDateTime.now();
    }

    public void incrementAttempts() {
        this.attempts++;
    }
}