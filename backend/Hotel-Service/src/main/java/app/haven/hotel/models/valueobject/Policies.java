package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Policies {

    @Column(name = "checkin_time")
    private LocalTime checkinTime;

    @Column(name = "checkout_time")
    private LocalTime checkoutTime;

    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @Column(name = "pet_allowed", nullable = false)
    @Builder.Default
    private Boolean petAllowed = false;

    @Column(name = "smoking_allowed", nullable = false)
    @Builder.Default
    private Boolean smokingAllowed = false;

    @Column(name = "extra_bed_policy", columnDefinition = "TEXT")
    private String extraBedPolicy;

    @Column(name = "important_notes", columnDefinition = "TEXT")
    private String importantNotes;

    @Embedded
    private ChildPolicy childPolicy;
}
