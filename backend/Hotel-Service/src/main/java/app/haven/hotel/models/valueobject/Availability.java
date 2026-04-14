package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Availability {
    private Integer totalRooms;
    private Integer availableRooms;
}
