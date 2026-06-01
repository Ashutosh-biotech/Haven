package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Capacity {

    @NotNull
    @Min(1)
    @Column(name = "capacity_adult", nullable = false)
    @Builder.Default
    private Integer adults = 1;

    @NotNull
    @Min(0)
    @Column(name = "capacity_children", nullable = false)
    @Builder.Default
    private Integer children = 0;

    @NotNull
    @Min(0)
    @Column(name = "capacity_extra_beds", nullable = false)
    @Builder.Default
    private Integer extraBeds = 0;
}
