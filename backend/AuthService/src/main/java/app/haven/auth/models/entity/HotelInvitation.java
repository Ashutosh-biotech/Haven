package app.haven.auth.models.entity;

import app.haven.auth.models.enums.InvitationStatus;
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
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "hotel_invitations",
        indexes = {
                @Index(name = "idx_hi_hotel", columnList = "hotel_id"),
                @Index(name = "idx_hi_email", columnList = "invited_email"),
                @Index(name = "idx_hi_status", columnList = "hotel_id, status"),
                @Index(name = "idx_hi_token", columnList = "token_hash", unique = true)
        }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelInvitation {

    @Id
    @Column(updatable = false, nullable = false, unique = true)
    @UuidGenerator
    @NotBlank
    @Setter(AccessLevel.NONE)
    private UUID HotelInvitationId;

    @Column(nullable = false, length = 36)
    @NotBlank
    private String hotelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_role_id", nullable = false)
    private HotelRole hotelRole;

    @Column(nullable = false, length = 255)
    @NotBlank
    private String invitedEmail;

    @Column(length = 36)
    private String invitedUserId;

    @Column(nullable = false, length = 36)
    @NotBlank
    private String invitedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private InvitationStatus status = InvitationStatus.PENDING;

    @Column(nullable = false, unique = true)
    @NotBlank
    private String tokenHash;

    @Column(nullable = false)
    @NotBlank
    private LocalDateTime expiresAt;

    private LocalDateTime acceptedAt;

    private LocalDateTime declinedAt;

    @Setter(AccessLevel.NONE)
    private LocalDateTime revokedAt;

    @Column(length = 36)
    @Setter(AccessLevel.NONE)
    private String revokedBy;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public boolean isExpired() {
        return expiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isPending() {
        return status == InvitationStatus.PENDING && !isExpired();
    }

    public void accept(String userId) {
        this.status = InvitationStatus.ACCEPTED;
        this.invitedUserId = userId;
        this.acceptedAt = LocalDateTime.now();
    }

    public void decline() {
        this.status = InvitationStatus.DECLINED;
        this.declinedAt = LocalDateTime.now();
    }

    public void revoke(String revokedByUserId) {
        this.status = InvitationStatus.REVOKED;
        this.revokedAt = LocalDateTime.now();
        this.revokedBy = revokedByUserId;
    }
}

