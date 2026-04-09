package app.haven.products.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Location {

    private String address;
    private String area;
    private String city;
    private String state;
    private String country;
    private long postalCode;

    // TODO: add coordinates here

    // TODO: add nearbyLandmarks here

    // TODO: add tags here


}

//        "coordinates": {
//          "latitude": 19.1856,
//          "longitude": 72.8687
//        },
//        "nearbyLandmarks": [
//          {
//              "name": "Chhatrapati Shivaji Maharaj International Airport",
//              "type": "Transport",
//              "distanceKm": 12.5
//          },
//          {
//              "name": "Phoenix Marketcity",
//              "type": "Shopping",
//              "distanceKm": 3.2
//          },
//          {
//              "name": "Mumbai International Convention Center",
//              "type": "Attraction",
//              "distanceKm": 1.8
//          }
//        ],
//        "tags": [
//          "city-center",
//          "business-district",
//          "public-transit"
//        ]
