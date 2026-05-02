package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    @Column(name = "media_thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "media_cover_image_url", length = 500)
    private String coverImageUrl;
}