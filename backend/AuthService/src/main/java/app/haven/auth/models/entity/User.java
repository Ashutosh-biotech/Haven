package app.haven.auth.models.entity;

import app.haven.auth.models.enums.UserStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
class User{

    @Id
    @Column(name = "user_id")
    private Long userId;

    @NotNull
    @Size(max = 80)
    @Column(length = 80, nullable = false, name = "first_name")
    private String firstName;

    @NotNull
    @Size(max = 80)
    @Column(length = 80, nullable = false, name = "last_name")
    private String lastName;

    @Size(max = 100)
    @Column(length = 100, name = "display_name")
    private String displayName;

    @NotNull
    @Size(max = 255)
    @Column(length = 255, nullable = false, unique = true)
    private String email;

    @NotNull
    @Size(max = 20)
    @Column(length = 20, unique = true, nullable = false, name = "phone_no")
    private String phoneNo;

    @Size(max = 500)
    @Column(length = 500, name = "avatar_url")
    private String avatarUrl;

    @Size(max = 255)
    @Column(length = 255)
    private String password;

    @Column(nullable = false, name = "is_email_verified")
    @Builder.Default
    private Boolean isEmailVerified = false;

    @Column(name = "is_phone_verified", nullable = false)
    @Builder.Default
    private Boolean isPhoneVerified = false;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    @Column(name = "phone_verified_at")
    private LocalDateTime phoneVerifiedAt;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(length = 20, nullable = false)
    private UserStatus status = UserStatus.PENDING_VERIFICATION;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "deactivated_at")
    private LocalDateTime deactivatedAt;

    @Column(length = 500, name = "deactivation_reason")
    private String deactivationReason;

    @Column(name = "failed_login_attempts", nullable = false)
    @Builder.Default
    private Integer failedLoginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Size(max = 45)
    @Column(name = "last_login_ip", length = 45)
    private String lastLoginIp;

    @Column(name = "password_changed_at")
    private LocalDateTime passwordChangedAt;

    @Column(name = "must_change_password", nullable = false)
    @Builder.Default
    private Boolean mustChangePassword = false;

    @Column(name = "is_anonymised", nullable = false)
    @Builder.Default
    private Boolean isAnonymised = false;

    @Column(name = "anonymised_at")
    private LocalDateTime anonymisedAt;

    @Column(length = 10, nullable = false)
    @Builder.Default
    private String locale = "en";

    @Column(length = 5, nullable = false)
    @Builder.Default
    private String currency = "INR";

    @Column(length = 36, nullable = false)
    @Builder.Default
    private String timezone = "Asia";

    @Column(name = "created_at", nullable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name = "created_by", length = 36)
    private String createdBy;

    @Column(nullable = false)
    @Builder.Default
    public Long version = 0L;

}
