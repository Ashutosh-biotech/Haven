package app.haven.auth.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_preferences",
        indexes = {
                @Index(name = "idx_prefs_user", columnList = "user_id", unique = true)
        }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferences {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    @NotBlank
    private UUID userPreferencesId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "email_notifications", nullable = false)
    @Builder.Default
    private Boolean emailNotifications = true;

    @Column(name = "sms_notifications", nullable = false)
    @Builder.Default
    private Boolean smsNotifications = true;

    @Column(name = "push_notifications", nullable = false)
    @Builder.Default
    private Boolean pushNotifications = true;

    @Column(name = "marketing_emails", nullable = false)
    @Builder.Default
    private Boolean marketingEmails = false;

    @Column(name = "newsletter", nullable = false)
    @Builder.Default
    private Boolean newsletter = false;

    @Column(name = "show_profile_public", nullable = false)
    @Builder.Default
    private Boolean showProfilePublic = false;

    @Column(name = "preferred_room_type", length = 50)
    private String preferredRoomType;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
