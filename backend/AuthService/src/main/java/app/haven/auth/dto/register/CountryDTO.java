package app.haven.auth.dto.register;

public record CountryDTO(
    String id,
    String name,
    String emoji,
    String phonecode,
    String currency,
    String timezone
) {

}
