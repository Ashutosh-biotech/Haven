package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingInfo {

    @Builder.Default
    private Boolean instantBooking = false;

    @Builder.Default
    private Boolean freeCancellation = false;

    @Builder.Default
    private Boolean loyaltyPointsEligible = false;

}
