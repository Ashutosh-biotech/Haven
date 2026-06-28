package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ratings {

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "avg_rating", nullable = false)
    @Builder.Default
    private Double avgRating = 0.0;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "rating_cleanliness")
    @Builder.Default
    private Double cleanliness = 0.0;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "rating_service")
    @Builder.Default
    private Double service = 0.0;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "rating_location")
    @Builder.Default
    private Double location = 0.0;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "rating_comfort")
    @Builder.Default
    private Double comfort = 0.0;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "rating_value")
    @Builder.Default
    private Double value = 0.0;
}
