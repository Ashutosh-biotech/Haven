package app.haven.auth.models.entity;

import app.haven.auth.models.enums.PermissionAction;
import app.haven.auth.models.enums.PermissionScope;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {

    @Id
    private String id;

    // The code used in @PreAuthorize("hasAuthority('HOTEL_PRICING_WRITE')")
    @Column(nullable = false, unique = true, length = 100)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    // Resource this permission applies to (HOTEL, ROOM, REVIEW, USER...)
    @Column(nullable = false, length = 50)
    private String resource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PermissionAction action;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PermissionScope scope;
}
