package app.haven.auth.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "hotel_staff_permissions",
        indexes = {
                @Index(name = "idx_hsp_staff", columnList = "hotel_staff_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_staff_permission",
                        columnNames = {
                                "hotel_staff_id",
                                "permission_id"
                        }
                )
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelStaffPermission {

    @Id
    private String id;

    // Parent staff assignment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_staff_id", nullable = false)
    private HotelStaff hotelStaff;

    // The permission being overridden
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    // true  → explicitly GRANT this permission (even if role doesn't have it)
    // false → explicitly DENY this permission  (even if role normally has it)
    @Column(name = "is_granted", nullable = false)
    private Boolean isGranted;

    // Which admin set this override — plain ID, no FK (self-reference)
    @Column(name = "granted_by", length = 36)
    private String grantedBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
