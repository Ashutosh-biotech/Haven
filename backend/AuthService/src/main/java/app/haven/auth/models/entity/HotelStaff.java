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
                @Index(name = "idx_hs_user", columnList = "user"),
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
    @Column(updatable = false, nullable = false)
    @UuidGenerator
    private UUID hotelStaffId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @Column(nullable = false, length = 36)
    private String hotelId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private HotelStaffRole role;

    @Column(length = 100)
    private String jobTitle;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(length = 36)
    private String invitedBy;

    private LocalDateTime invitedAt;

    private LocalDateTime joinedAt;

    @OneToMany(mappedBy = "hotelStaff", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<HotelStaffPermission> permissionOverrides = new ArrayList<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public boolean hasPermission(String permissionCode) {
        return permissionOverrides.stream()
                .filter(p -> p.getPermission().getCode().equals(permissionCode))
                .findFirst()
                .map(HotelStaffPermission::getIsGranted)
                .orElse(false);
    }
}
