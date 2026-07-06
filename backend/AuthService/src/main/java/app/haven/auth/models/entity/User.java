package app.haven.auth.models.entity;

import app.haven.auth.models.enums.UserStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CheckConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_users_email", columnList = "email", unique = true),
                @Index(name = "idx_users_status", columnList = "status"),
                @Index(name = "idx_users_active", columnList = "is_active")
        },
        check = {
                @CheckConstraint(
                        name = "chk_user_soft_delete",
                        constraint = "is_active = TRUE OR deactivated_at IS NOT NULL"
                ),
                @CheckConstraint(
                        name = "chk_user_email_verify",
                        constraint = "is_email_verified = FALSE OR email_verified_at IS NOT NULL"
                ),
                @CheckConstraint(
                        name = "chk_user_anonymised",
                        constraint = "is_anonymised = FALSE OR anonymised_at IS NOT NULL"
                )
        }
)
public class User {

    @Id
    @Column(updatable = false, nullable = false, unique = true)
    @UuidGenerator
    @NotBlank
    private UUID userId;

    @NotBlank
    @Size(max = 80)
    @Column(length = 80, nullable = false)
    private String firstName;

    @NotBlank
    @Size(max = 80)
    @Column(length = 80, nullable = false)
    private String lastName;

    @Size(max = 100)
    @Column(length = 100)
    private String displayName;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(max = 20)
    @Column(length = 20, unique = true, nullable = false)
    private String phoneNo;

    @Size(max = 500)
    @Column(length = 500)
    private String avatarUrl;

    private String passwordHash;

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Boolean isEmailVerified = false;

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Boolean isPhoneVerified = false;

    private LocalDateTime emailVerifiedAt;

    private LocalDateTime phoneVerifiedAt;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @NotNull
    @Column(length = 20, nullable = false)
    private UserStatus status = UserStatus.PENDING_VERIFICATION;

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    private LocalDateTime deactivatedAt;

    @Column(length = 500)
    private String deactivationReason;

    @Builder.Default
    @NotNull
    @Column(
            nullable = false,
            check = @CheckConstraint(
                    name = "chk_failed_attempts",
                    constraint = "failed_login_attempts >= 0"
            )
    )
    @Min(0)
    private Integer failedLoginAttempts = 0;

    private LocalDateTime lockedUntil;

    private LocalDateTime lastLoginAt;

    @Size(max = 45)
    @Column(length = 45)
    private String lastLoginIp;

    private LocalDateTime passwordChangedAt;

    @Column(nullable = false)
    @Builder.Default
    @NotNull
    private Boolean mustChangePassword = false;

    @Column(nullable = false)
    @Builder.Default
    @NotNull
    private Boolean isAnonymised = false;

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

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(length = 36)
    private String createdBy;

    @Version
    @Builder.Default
    private Long version = 0L;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserPreferences preferences;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<UserAuthProvider> authProviders = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<UserAddress> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<UserRole> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<HotelStaff> hotelStaffAssignments = new ArrayList<>();

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
