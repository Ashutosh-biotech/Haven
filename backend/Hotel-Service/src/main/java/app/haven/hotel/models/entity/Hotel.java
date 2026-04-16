package app.haven.hotel.models.entity;

import app.haven.hotel.models.enums.HotelStatus;
import app.haven.hotel.models.valueobject.*;
import jakarta.persistence.*;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    @Column(name = "hotel_id", length = 50)
    private String hotelId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(length = 2000)
    private String description;

    private int starRating;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private HotelStatus status = HotelStatus.ACTIVE;

    @ManyToMany
    @JoinTable(
        name = "hotel_category_mapping",
        joinColumns = @JoinColumn(name = "hotel_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    @ElementCollection
    @CollectionTable(
        name = "hotel_tags",
        joinColumns = @JoinColumn(name = "hotel_id")
    )
    @Column(name = "tag")
    private Set<String> tags;

    @Embedded
    private Location location;

    @Embedded
    private Contact contact;

    @Embedded
    private Media media;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "hotel_id")
    private List<Amenity> amenities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "hotel_id")
    private List<RoomType> roomTypes;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "hotel_id")
    private List<Award> awards;

    @Embedded
    private Ratings ratings;

    @Embedded
    private BookingInfo bookingInfo;
}
