package app.haven.hotel.models.valueobject;

import app.haven.hotel.models.entity.GalleryItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    private String thumbnailUrl;
    private String coverImageUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "hotel_id")
    private List<GalleryItem> gallery;

    private String videoTourUrl;
}