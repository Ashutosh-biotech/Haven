package app.haven.hotel.models.entity;

import app.haven.hotel.models.valueobject.ReviewImage;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
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
@Table(name = "hotel_reviews", indexes = {
        @Index(name = "idx_hotel_reviews_hotel_id", columnList = "hotel_id"),
        @Index(name = "idx_hotel_reviews_user_id", columnList = "user_id")
})
public class HotelReview {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotBlank
    @Column(name = "user_id", nullable = false, length = 36)
    private String userId;

    @NotNull
    @DecimalMin("0.5")
    @DecimalMax("5.0")
    @Column(nullable = false, precision = 3, scale = 1)
    private Double rating;

    @Column(length = 255)
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    @NotNull
    @Column(name = "review_date", nullable = false)
    private LocalDateTime reviewDate;

    @Min(0)
    @Column(name = "helpful_votes", nullable = false)
    @Builder.Default
    private Integer helpfulVotes = 0;

    @Column(name = "is_verified_stay", nullable = false)
    @Builder.Default
    private Boolean isVerifiedStay = false;

    // ── Element Collections ─────────────────────────────────────────

    @ElementCollection
    @CollectionTable(name = "review_images", joinColumns = @JoinColumn(name = "review_id"))
    @Builder.Default
    private List<ReviewImage> images = new ArrayList<>();

    // ── Relationships ───────────────────────────────────────────────

    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY)
    private List<ReviewReply> reply;

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
