package app.haven.hotel.models.entity;

import app.haven.hotel.models.enums.RateType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "room_rates",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_room_rates_room_date_type",
                        columnNames = {"room_id", "rate_date", "rate_type"})
        },
        indexes = {
                @Index(name = "idx_room_rates_room_id", columnList = "room_id"),
                @Index(name = "idx_room_rates_rate_date", columnList = "rate_date")
        })
public class RoomRate {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @NotNull
    @Column(name = "rate_date", nullable = false)
    private LocalDate rateDate;

    @NotNull
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "rate_type", nullable = false, length = 20)
    private RateType rateType;

    @NotBlank
    @Column(nullable = false, length = 5)
    @Builder.Default
    private String currency = "INR";

    @NotNull
    @Min(1)
    @Column(name = "min_stay_nights", nullable = false)
    @Builder.Default
    private Integer minStayNights = 1;

    @Min(1)
    @Column(name = "max_stay_nights")
    private Integer maxStayNights;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    @Column(name = "discount_percentage", nullable = false, precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    @Column(name = "is_closed", nullable = false)
    @Builder.Default
    private Boolean isClosed = false;

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
