package app.haven.auth.models.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        indexes = {
                @Index(name = "idx_hs_user", columnList = "user_id"),
                @Index(name = "idx_hs_hotel", columnList = "hotel_id"),
                @Index(name = "idx_hs_active", columnList = "hotel_id, is_active")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelStaff {

    @Id
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID hotelStaffId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(nullable = false, length = 36)
    @NotBlank
    private String hotelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_role_id", nullable = false)
    private HotelRole hotelRole;

    @Column(name = "job_title", length = 100)
    private String jobTitle;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

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
                .filter(o -> o.getPermission().getCode().equals(permissionCode))
                .findFirst()
                .map(HotelStaffPermission::getIsGranted)
                .orElseGet(() -> hotelRole.getPermissions().stream()
                        .anyMatch(p -> p.getCode().equals(permissionCode))
                );
    }
}