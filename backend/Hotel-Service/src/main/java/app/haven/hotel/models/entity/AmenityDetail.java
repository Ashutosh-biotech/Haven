package app.haven.hotel.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "amenity_details", indexes = {
        @Index(name = "idx_amenity_details_hotel_id", columnList = "hotel_id"),
        @Index(name = "idx_amenity_details_amenity_id", columnList = "amenity_id")
})
public class AmenityDetail {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_id", nullable = false)
    private Amenity amenity;

    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "is_free", nullable = false)
    @Builder.Default
    private Boolean isFree = true;

    @Column(name = "premium_room_only", nullable = false)
    @Builder.Default
    private Boolean premiumRoomOnly = false;

    @Column(name = "is_premium", nullable = false)
    @Builder.Default
    private Boolean isPremium = false;

    @Column(name = "member_only", nullable = false)
    @Builder.Default
    private Boolean memberOnly = false;

    @Column(name = "is_available", nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(name = "package_included", nullable = false)
    @Builder.Default
    private Boolean packageIncluded = false;

    @Column(columnDefinition = "TEXT")
    private String note;

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
