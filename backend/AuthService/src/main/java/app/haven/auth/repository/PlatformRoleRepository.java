package app.haven.auth.repository;

import app.haven.auth.models.entity.PlatformRole;
import app.haven.auth.models.enums.PlatformRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlatformRoleRepository extends JpaRepository<PlatformRole, UUID> {
    Optional<PlatformRole> findByName(PlatformRoleEnum name);
}

