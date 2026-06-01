package app.haven.hotel.models.entity;

import app.haven.hotel.models.enums.AccessibilityFeatureType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "hotel_accessibility", indexes = {
        @Index(name = "idx_hotel_accessibility_hotel_id", columnList = "hotel_id"),
        @Index(name = "idx_hotel_accessibility_feature_type", columnList = "feature_type")
})
public class HotelAccessibility {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "feature_type", nullable = false, length = 20)
    private AccessibilityFeatureType featureType;

    @NotBlank
    @Column(name = "feature_name", nullable = false, length = 255)
    private String featureName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_certified", nullable = false)
    @Builder.Default
    private Boolean isCertified = false;

    @Column(name = "certification_body", length = 120)
    private String certificationBody;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
