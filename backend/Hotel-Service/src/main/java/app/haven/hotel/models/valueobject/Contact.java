package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Contact {

    @NotBlank
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(nullable = false, name = "contact_phone", length = 20)
    private String phone;

    @Email(message = "Invalid email format")
    @Column(name = "contact_email", length = 120)
    private String email;

    @Column(name = "contact_website", columnDefinition = "TEXT")
    private String website;
}
