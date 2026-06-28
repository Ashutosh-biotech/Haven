package app.haven.hotel.models.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pricing {

    @NotNull
    @DecimalMin(value = "0.01", message = "Base price must be greater than 0")
    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;

    @NotBlank
    @Column(name = "currency", nullable = false, length = 5)
    @Builder.Default
    private String currency = "INR";

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    @Column(name = "tax_percentage", nullable = false)
    @Builder.Default
    private BigDecimal taxPercentage = BigDecimal.ZERO;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    @Column(name = "discount_percentage", nullable = false)
    @Builder.Default
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    @DecimalMin("0.0")
    @Column(name = "per_person_price")
    private BigDecimal perPersonPrice;
}
