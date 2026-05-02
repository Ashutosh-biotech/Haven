package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Min;
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

    @Column(name = "instant_booking", nullable = false)
    @Builder.Default
    private Boolean instantBooking = false;

    @Column(name = "free_cancellation", nullable = false)
    @Builder.Default
    private Boolean freeCancellation = false;

    @Column(name = "loyalty_point_eligible", nullable = false)
    @Builder.Default
    private Boolean loyaltyPointEligible = false;

    @Column(name = "deposit_required", nullable = false)
    @Builder.Default
    private Boolean depositRequired = false;

    @Min(0)
    @Column(name = "min_advance_booking_hrs")
    private Integer minAdvanceBookingHrs;
}
