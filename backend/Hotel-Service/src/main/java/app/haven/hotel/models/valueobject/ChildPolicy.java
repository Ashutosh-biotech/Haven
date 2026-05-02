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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChildPolicy {

    @Column(name = "children_allowed", nullable = false)
    @Builder.Default
    private Boolean childrenAllowed = true;

    @Min(0)
    @Column(name = "free_stay_age_limit")
    private Integer freeStayAgeLimit;

    @Column(name = "extra_child_policy", columnDefinition = "TEXT")
    private String extraChildPolicy;
}
