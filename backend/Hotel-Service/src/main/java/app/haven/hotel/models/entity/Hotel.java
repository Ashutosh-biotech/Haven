package app.haven.hotel.models.entity;

import app.haven.hotel.models.enums.HotelType;
import app.haven.hotel.models.enums.StarRating;
import app.haven.hotel.models.enums.Status;
import app.haven.hotel.models.valueobject.BookingInfo;
import app.haven.hotel.models.valueobject.Gallery;
import app.haven.hotel.models.valueobject.Location;
import app.haven.hotel.models.valueobject.Media;
import app.haven.hotel.models.valueobject.Metadata;
import app.haven.hotel.models.valueobject.Policies;
import app.haven.hotel.models.valueobject.Ratings;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "hotels", indexes = {
        @Index(name = "idx_hotels_slug", columnList = "slug", unique = true),
        @Index(name = "idx_hotels_name", columnList = "name"),
        @Index(name = "idx_hotels_hotel_type", columnList = "hotel_type"),
        @Index(name = "idx_hotels_star_rating", columnList = "star_rating"),
        @Index(name = "idx_hotels_status", columnList = "status"),
        @Index(name = "idx_hotels_city", columnList = "location_city"),
        @Index(name = "idx_hotels_state", columnList = "location_state"),
        @Index(name = "idx_hotels_min_price", columnList = "min_price_per_night"),
        @Index(name = "idx_hotels_is_deleted", columnList = "is_deleted")
})
public class Hotel {

    @Id
    @Size(max = 36)
    @Column(name = "hotel_id", length = 36, nullable = false, unique = true)
    private String hotelId;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, unique = true, length = 120, updatable = false)
    private String slug;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false)
    private String name;

    @Column(length = 120)
    private String brand;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "hotel_type", nullable = false, length = 30)
    @Builder.Default
    private HotelType hotelType = HotelType.HOTEL;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "star_rating", nullable = false, length = 10)
    @Builder.Default
    private StarRating starRating = StarRating.ZERO;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$",
            message = "Invalid GSTIN format")
    @Column(length = 15)
    private String gstin;

    @NotNull
    @Column(name = "is_verified", nullable = false)
    @Builder.Default
    private Boolean isVerified = false;

    @NotNull
    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @DecimalMin("0.0")
    @Column(name = "min_price_per_night", precision = 10, scale = 2)
    private BigDecimal minPricePerNight;

    // ── Embedded Value Objects ──────────────────────────────────────

    @Embedded
    private Location location;

    @Embedded
    private Media media;

    @Embedded
    private Policies policies;

    @Embedded
    private BookingInfo bookingInfo;

    @Embedded
    private Ratings ratings;

    @Embedded
    private Metadata metadata;

    // ── Element Collections ─────────────────────────────────────────

    @ElementCollection
    @CollectionTable(name = "hotel_gallery", joinColumns = @JoinColumn(name = "hotel_id"))
    @NotBlank
    @Singular("addGalleryItem")
    private List<Gallery> gallery;

    @ElementCollection
    @CollectionTable(name = "hotel_category_ids", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "category_id", length = 36)
    @Singular("addCategory")
    private Set<String> categoryIds;

    @ElementCollection
    @CollectionTable(name = "hotel_other_payment_options", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "hotel_payment_option")
    @NotBlank
    @Singular("addPaymentOption")
    private Set<String> HotelPaymentOptions;

    @ElementCollection
    @CollectionTable(name = "hotel_tags", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "hotel_tag")
    @NotBlank
    @Size(min = 1, max = 25)
    @Singular("addTag")
    private Set<String> tags;

    // ── Relationships ───────────────────────────────────────────────

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AmenityDetail> amenityDetails = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelAward> awards = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelNearbyLandmark> nearbyLandmarks = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelMemberTier> memberTiers = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelTranslation> translations = new ArrayList<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HotelAccessibility> accessibilityFeatures = new ArrayList<>();
}
