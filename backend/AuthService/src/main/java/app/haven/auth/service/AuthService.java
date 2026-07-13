package app.haven.auth.service;

import app.haven.auth.dto.request.RegisterRequestDTO;
import app.haven.auth.models.entity.User;
import app.haven.auth.models.entity.UserAddress;
import app.haven.auth.models.entity.UserPreferences;
import app.haven.auth.models.entity.UserPlatformRole;
import app.haven.auth.models.entity.PlatformRole;
import app.haven.auth.models.enums.PlatformRoleEnum;
import app.haven.auth.repository.UserRepository;
import app.haven.auth.repository.PlatformRoleRepository;
import app.haven.auth.repository.UserPlatformRoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PlatformRoleRepository platformRoleRepository;
    private final UserPlatformRoleRepository userPlatformRoleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(RegisterRequestDTO registerRequestDTO) {
        if (registerRequestDTO.email() == null || registerRequestDTO.email().isBlank()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }

        if (userRepository.existsByEmail(registerRequestDTO.email())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        if (registerRequestDTO.password() == null || !registerRequestDTO.password().equals(registerRequestDTO.repeatPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = User.builder()
                .firstName(registerRequestDTO.firstName())
                .lastName(registerRequestDTO.lastName())
                .email(registerRequestDTO.email())
                .phoneNo(String.valueOf(registerRequestDTO.phone()))
                .passwordHash(passwordEncoder.encode(registerRequestDTO.password()))
                .locale("en")
                .currency(registerRequestDTO.country() != null && registerRequestDTO.country().currency() != null 
                        ? registerRequestDTO.country().currency() : "INR")
                .timezone(registerRequestDTO.country() != null && registerRequestDTO.country().timezone() != null 
                        ? registerRequestDTO.country().timezone() : "Asia/Kolkata")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .version(0L)
                .addresses(new ArrayList<>())
                .authProviders(new ArrayList<>())
                .hotelStaffAssignments(new ArrayList<>())
                .userPlatformRoles(new ArrayList<>())
                .build();

        UserPreferences preferences = UserPreferences.builder()
                .user(user)
                .emailNotifications(true)
                .smsNotifications(true)
                .pushNotifications(true)
                .marketingEmails(false)
                .newsletter(false)
                .showProfilePublic(false)
                .preferredRoomType("STANDARD")
                .updatedAt(LocalDateTime.now())
                .build();
        user.setPreferences(preferences);

        if (registerRequestDTO.address1() != null && !registerRequestDTO.address1().isBlank()) {
            UserAddress address = UserAddress.builder()
                    .user(user)
                    .addressLine1(registerRequestDTO.address1())
                    .addressLine2(registerRequestDTO.address2())
                    .city(registerRequestDTO.city())
                    .state(registerRequestDTO.state())
                    .country(registerRequestDTO.country() != null && registerRequestDTO.country().name() != null 
                            ? registerRequestDTO.country().name() : "India")
                    .postcode(String.valueOf(registerRequestDTO.postcode()))
                    .isDefault(registerRequestDTO.isDefaultAddress())
                    .build();
            user.getAddresses().add(address);
        }

        userRepository.save(user);

        Optional<PlatformRole> guestRole = platformRoleRepository.findByName(PlatformRoleEnum.GUEST);

        if (guestRole.isPresent()) {
            UserPlatformRole userPlatformRole = UserPlatformRole.builder()
                    .user(user)
                    .platformRole(guestRole.get())
                    .assignedAt(LocalDateTime.now())
                    .isActive(true)
                    .build();
            userPlatformRoleRepository.save(userPlatformRole);
        }
    }
}

