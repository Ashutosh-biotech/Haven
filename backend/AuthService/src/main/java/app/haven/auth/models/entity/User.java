package app.haven.auth.models.entity;

import app.haven.auth.models.enums.UserStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users",
        indexes = {
                @Index(name = "idx_users_email", columnList = "email", unique = true),
                @Index(name = "idx_users_phone", columnList = "phone"),
                @Index(name = "idx_users_status", columnList = "status"),
                @Index(name = "idx_users_active", columnList = "is_active")
        })
class User {

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
    @Column(length = 255, name = "password_hash")
    private String passwordHash;

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

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name = "created_by", length = 36)
    private String createdBy;

    @Version
    private Long version;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<UserAuthProvider> authProviders = new ArrayList<>();

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public boolean isLocked() {
        return lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now());
    }

    public boolean hasPassword() {
        return passwordHash != null && !passwordHash.isBlank();
    }

    public void incrementFailedAttempts(int maxAttempts, int lockMinutes) {
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= maxAttempts) {
            this.lockedUntil = LocalDateTime.now().plusMinutes(lockMinutes);
        }
    }

    public void resetFailedAttempts() {
        this.failedLoginAttempts = 0;
        this.lockedUntil = null;
    }

    public void anonymise() {
        this.firstName = "Deleted";
        this.lastName = "User";
        this.displayName = "Deleted User";
        this.email = "deleted_" + this.userId + "@haven.invalid";
        this.phoneNo = null;
        this.avatarUrl = null;
        this.passwordHash = null;
        this.lastLoginIp = null;
        this.isAnonymised = true;
        this.anonymisedAt = LocalDateTime.now();
        this.isActive = false;
        this.deactivatedAt = LocalDateTime.now();
        this.deactivationReason = "GDPR_ERASURE";
    }
}
