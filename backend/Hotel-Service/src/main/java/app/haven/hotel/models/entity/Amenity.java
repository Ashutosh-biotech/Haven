package app.haven.hotel.models.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String amenityId;
    private String name;
    private String category;
    private String icon;
    private Boolean isFeatured;
    private Boolean isFree;

    @Column(length = 1000)
    private String note;
}
