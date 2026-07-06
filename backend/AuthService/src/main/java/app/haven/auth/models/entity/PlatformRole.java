package app.haven.auth.models.entity;

import app.haven.auth.models.enums.PlatformRoleEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformRole {

    @Id
    @UuidGenerator
    @Column(nullable = false, updatable = false)
    @NotBlank
    private UUID platformRoleId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotBlank
    private PlatformRoleEnum name;

    private String Description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "platform_role_permissions",
            joinColumns = @JoinColumn(name = "platform_role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    @Builder.Default
    private Set<Permission> permissions = new HashSet<>();

    @NotBlank
    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime createdAt;
}
