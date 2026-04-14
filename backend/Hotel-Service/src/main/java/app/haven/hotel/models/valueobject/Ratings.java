package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ratings {
    private Double averageRating;
    private Integer totalReviews;

    @Embedded
    private CategoryRatings categoryRatings;
}
