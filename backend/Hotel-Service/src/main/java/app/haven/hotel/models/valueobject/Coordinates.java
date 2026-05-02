package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coordinates {

    @Column(name = "coord_latitude")
    private Double latitude;

    @Column(name = "coord_longitude")
    private Double longitude;
}
