package app.haven.hotel.models.entity;

import app.haven.hotel.models.valueobject.Capacity;
import app.haven.hotel.models.valueobject.Pricing;
import app.haven.hotel.models.valueobject.RoomMedia;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rooms", indexes = {
        @Index(name = "idx_rooms_hotel_id", columnList = "hotel_id"),
        @Index(name = "idx_rooms_base_price", columnList = "base_price"),
        @Index(name = "idx_rooms_is_active", columnList = "is_active")
})
public class Room {

    @Id
    @Column(name = "room_id", length = 36, nullable = false)
    private String roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @DecimalMin(value = "0.01", message = "Room size must be greater than 0")
    @Column(name = "size_sqm", precision = 8, scale = 2)
    private BigDecimal sizeSqm;

    @Column(name = "bed_config", length = 100)
    private String bedConfig;

    @Column(length = 100)
    private String view;

    @Min(0)
    @Column(name = "floor_level")
    private Integer floorLevel;

    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    // ── Embedded Value Objects ──────────────────────────────────────

    @Embedded
    private Capacity capacity;

    @Embedded
    private Pricing pricing;

    // ── Element Collections ─────────────────────────────────────────

    @ElementCollection
    @CollectionTable(name = "room_media", joinColumns = @JoinColumn(name = "room_id"))
    @Builder.Default
    private List<RoomMedia> media = new ArrayList<>();

    // ── Relationships ───────────────────────────────────────────────

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RoomAmenity> amenities = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RoomInventory> inventory = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RoomRate> rates = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RoomTranslation> translations = new ArrayList<>();

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
