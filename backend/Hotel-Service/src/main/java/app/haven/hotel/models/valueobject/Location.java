package app.haven.hotel.models.valueobject;

import java.util.List;

import app.haven.hotel.models.entity.NearByLandmark;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    private String address;
    private String area;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    @Embedded
    private Coordinates coordinates;

    @ElementCollection
    @CollectionTable(name = "nearby_landmarks", joinColumns = @JoinColumn(name = "hotel_id"))
    private List<NearByLandmark> nearbyLandmarks;

    @ElementCollection
    @CollectionTable(name = "location_tags", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "tag")
    private Set<String> tags;
}