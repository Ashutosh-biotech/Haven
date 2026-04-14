package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pricing {
    private Double basePrice;
    private String currency;
    private Double taxPercentage;
    private Double discountPercentage;
}
