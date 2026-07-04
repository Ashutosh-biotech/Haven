package app.haven.auth.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_preferences",
        indexes = {
                @Index(name = "idx_prefs_user", columnList = "user_id", unique = true)
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferences {

    @Id
    private String id;

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
