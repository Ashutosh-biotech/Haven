package app.haven.hotel.models.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "hotel_member_tiers", indexes = {
        @Index(name = "idx_hotel_member_tiers_hotel_id", columnList = "hotel_id")
})
public class HotelMemberTier {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String tier;

    @NotNull
    @Min(0)
    @Column(name = "point_per_100_rupees", nullable = false)
    private Integer pointPer100Rupees;

    // ── Element Collections ─────────────────────────────────────────

    @ElementCollection
    @CollectionTable(name = "member_tier_benefits", joinColumns = @JoinColumn(name = "member_tier_id"))
    @Column(name = "benefit", nullable = false, length = 255)
    @Builder.Default
    private List<String> benefits = new ArrayList<>();

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
