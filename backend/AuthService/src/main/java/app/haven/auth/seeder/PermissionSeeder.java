package app.haven.auth.seeder;

import app.haven.auth.models.entity.Permission;
import app.haven.auth.models.enums.PermissionAction;
import app.haven.auth.models.enums.PermissionScope;
import app.haven.auth.repository.PermissionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("seeder")
@Component
public class PermissionSeeder implements CommandLineRunner {

    private final PermissionRepository permissionRepository;

    public PermissionSeeder(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public void run(String... args) {
        // HOTEL Permissions
        registerPermission("HOTEL_READ", "Hotel Read", "View hotel details", "HOTEL", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("HOTEL_WRITE", "Hotel Write", "Create and modify hotel information", "HOTEL", PermissionAction.WRITE, PermissionScope.HOTEL);
        registerPermission("HOTEL_DELETE", "Hotel Delete", "Delete hotel records", "HOTEL", PermissionAction.DELETE, PermissionScope.GLOBAL);
        registerPermission("HOTEL_VERIFY", "Hotel Verify", "Verify and approve hotel listings", "HOTEL", PermissionAction.MANAGE, PermissionScope.GLOBAL);

        // ROOM Permissions
        registerPermission("ROOM_READ", "Room Read", "View room details and availability", "ROOM", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("ROOM_WRITE", "Room Write", "Create and modify room information", "ROOM", PermissionAction.WRITE, PermissionScope.HOTEL);
        registerPermission("ROOM_DELETE", "Room Delete", "Delete room records", "ROOM", PermissionAction.DELETE, PermissionScope.HOTEL);

        // PRICING Permissions
        registerPermission("PRICING_READ", "Pricing Read", "View pricing and rate information", "PRICING", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("PRICING_WRITE", "Pricing Write", "Manage pricing and rates", "PRICING", PermissionAction.WRITE, PermissionScope.HOTEL);

        // INVENTORY Permissions
        registerPermission("INVENTORY_READ", "Inventory Read", "View inventory status", "INVENTORY", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("INVENTORY_WRITE", "Inventory Write", "Update inventory", "INVENTORY", PermissionAction.WRITE, PermissionScope.HOTEL);

        // REVIEW Permissions
        registerPermission("REVIEW_READ", "Review Read", "View guest reviews", "REVIEW", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("REVIEW_REPLY_WRITE", "Review Reply Write", "Respond to guest reviews", "REVIEW", PermissionAction.WRITE, PermissionScope.HOTEL);
        registerPermission("REVIEW_DELETE", "Review Delete", "Delete inappropriate reviews", "REVIEW", PermissionAction.DELETE, PermissionScope.GLOBAL);

        // AMENITY Permissions
        registerPermission("AMENITY_READ", "Amenity Read", "View hotel amenities", "AMENITY", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("AMENITY_WRITE", "Amenity Write", "Manage hotel amenities", "AMENITY", PermissionAction.WRITE, PermissionScope.HOTEL);

        // USER Permissions
        registerPermission("USER_READ", "User Read", "View user profiles and information", "USER", PermissionAction.READ, PermissionScope.SELF);
        registerPermission("USER_WRITE", "User Write", "Create and modify user accounts", "USER", PermissionAction.WRITE, PermissionScope.SELF);
        registerPermission("USER_DELETE", "User Delete", "Delete user accounts", "USER", PermissionAction.DELETE, PermissionScope.GLOBAL);

        // ANALYTICS Permissions
        registerPermission("ANALYTICS_HOTEL_READ", "Hotel Analytics Read", "View hotel-specific analytics and reports", "ANALYTICS", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("ANALYTICS_PLATFORM_READ", "Platform Analytics Read", "View platform-wide analytics", "ANALYTICS", PermissionAction.READ, PermissionScope.GLOBAL);

        // STAFF Permissions
        registerPermission("STAFF_READ", "Staff Read", "View staff information", "STAFF", PermissionAction.READ, PermissionScope.HOTEL);
        registerPermission("STAFF_WRITE", "Staff Write", "Manage staff accounts and assignments", "STAFF", PermissionAction.WRITE, PermissionScope.HOTEL);

    }

    private void registerPermission(String code, String name, String description, String resource, PermissionAction action, PermissionScope scope) {
        permissionRepository.findByCode(code)
                .orElseGet(() -> permissionRepository.save(
                        Permission.builder()
                                .code(code)
                                .name(name)
                                .description(description)
                                .resource(resource)
                                .action(action)
                                .scope(scope)
                                .build()
                ));
    }
}
