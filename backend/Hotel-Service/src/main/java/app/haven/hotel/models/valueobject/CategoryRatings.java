package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRatings {
    private Double cleanliness;
    private Double service;
    private Double location;
}
