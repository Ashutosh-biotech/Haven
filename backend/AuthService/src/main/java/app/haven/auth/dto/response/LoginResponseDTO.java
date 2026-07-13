package app.haven.auth.dto;

public record LoginResponseDTO(
        String accessToken,
        String refreshToken,
        String tokenType,
        String expiresAt,
        String hotelId
) {
}
