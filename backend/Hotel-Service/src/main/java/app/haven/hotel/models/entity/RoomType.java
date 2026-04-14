package app.haven.hotel.models.entity;

import app.haven.hotel.models.valueobject.Availability;
import app.haven.hotel.models.valueobject.Capacity;
import app.haven.hotel.models.valueobject.Pricing;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomTypeId;
    private String name;
    @Column(length = 2000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "roomtype_tags", joinColumns = @JoinColumn(name = "roomtype_id"))
    @Column(name = "tag")
    private Set<String> tags;

    @Embedded
    private Capacity capacity;

    private Double sizeSqm;
    private String bedConfig;
    private String view;

    @Embedded
    private Pricing pricing;

    @Embedded
    private Availability availability;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "roomtype_id")
    private List<RoomAmenity> amenities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "roomtype_id")
    private List<GalleryItem> media;
}
