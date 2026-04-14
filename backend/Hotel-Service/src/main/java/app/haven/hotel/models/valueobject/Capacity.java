package app.haven.hotel.models.valueobject;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Capacity {
    private Integer adults;
    private Integer children;
    private Integer extraBeds;
}
