package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    @NotBlank
    @Column(nullable = false, name = "location_address")
    private String address;

    @Column(name = "location_locality", length = 120)
    private String locality;

    @NotBlank
    @Column(nullable = false, name = "location_city", length = 100)
    private String city;

    @NotBlank
    @Column(nullable = false, name = "location_state", length = 100)
    private String state;

    @NotBlank
    @Column(nullable = false, name = "location_country", length = 100)
    @Builder.Default
    private String country = "India";

    @Column(name = "location_postcode", length = 20)
    private String postcode;

    @NotBlank
    @Column(nullable = false, name = "timezone", length = 50)
    private String timezone;

    @Embedded
    private Coordinates coordinates;

    @Embedded
    private Contact contact;
}
