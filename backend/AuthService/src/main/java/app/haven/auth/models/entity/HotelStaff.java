package app.haven.auth.models.entity;

import app.haven.auth.models.enums.HotelStaffRole;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "hotel_staff",
        indexes = {
                @Index(name = "idx_hs_user", columnList = "user_id"),
                @Index(name = "idx_hs_hotel", columnList = "hotel_id")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelStaff {

    @Id
    private String hotelStaffId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // External hotel-service ID — no FK constraint
    @Column(name = "hotel_id", nullable = false, length = 36)
    private String hotelId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private HotelStaffRole role;

    @Column(name = "job_title", length = 100)
    private String jobTitle;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "invited_by", length = 36)
    private String invitedBy;  // user_id of the inviting admin

    @Column(name = "invited_at")
    private LocalDateTime invitedAt;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @OneToMany(mappedBy = "hotelStaff", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<HotelStaffPermission> permissionOverrides = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public boolean hasPermission(String permissionCode) {
        return permissionOverrides.stream()
                .filter(p -> p.getPermission().getCode().equals(permissionCode))
                .findFirst()
                .map(HotelStaffPermission::getIsGranted)
                .orElse(false); // actual default lookup is in the service layer
    }
}
