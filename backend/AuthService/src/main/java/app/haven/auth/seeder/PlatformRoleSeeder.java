package app.haven.auth.seeder;

import app.haven.auth.models.entity.PlatformRole;
import app.haven.auth.models.enums.PlatformRoleEnum;
import app.haven.auth.repository.PlatformRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("seeder")
public class PlatformRoleSeeder implements CommandLineRunner {

    private final PlatformRoleRepository platformRoleRepository;

    public PlatformRoleSeeder(PlatformRoleRepository platformRoleRepository) {
        this.platformRoleRepository = platformRoleRepository;
    }

    @Override
    public void run(String... args) {

        createRole(
                PlatformRoleEnum.GUEST,
                "User Platform Role"
        );

        createRole(
                PlatformRoleEnum.SUPPORT_GUEST,
                "User Support Platform Role"
        );

        createRole(
                PlatformRoleEnum.SUPER_ADMIN,
                "Administrator Platform Role"
        );
    }

    private void createRole(
            PlatformRoleEnum name,
            String description
    ) {

        platformRoleRepository.findByName(name)
                .orElseGet(() ->
                        platformRoleRepository.save(
                                PlatformRole.builder()
                                        .name(name)
                                        .Description(description)
                                        .build()
                        )
                );
    }
}
