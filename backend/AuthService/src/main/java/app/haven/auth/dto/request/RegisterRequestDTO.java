package app.haven.auth.dto.request;

import app.haven.auth.dto.register.CountryDTO;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(
    @NotBlank String firstName,
    String lastName,
    String email,
    Long phone,
    String password,
    String repeatPassword,
    CountryDTO country,
    String address1,
    String address2,
    String city,
    String state,
    Long postcode,
    Boolean isDefaultAddress,
    Boolean agreeTerms
) {}
