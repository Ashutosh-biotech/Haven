package app.haven.auth.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(
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
    private String hotelStaffPermissionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_staff_id", nullable = false)
    private HotelStaff hotelStaff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    @Column(name = "is_granted", nullable = false)
    private Boolean isGranted;

    @Column(name = "granted_by", length = 36)
    private String grantedBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
