package app.haven.hotel.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "room_inventory",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_room_inventory_room_date",
                        columnNames = {"room_id", "inventory_date"})
        },
        indexes = {
                @Index(name = "idx_room_inventory_room_id", columnList = "room_id"),
                @Index(name = "idx_room_inventory_date", columnList = "inventory_date")
        })
public class RoomInventory {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @NotNull
    @Column(name = "inventory_date", nullable = false)
    private LocalDate inventoryDate;

    @NotNull
    @Min(1)
    @Column(name = "total_rooms", nullable = false)
    private Integer totalRooms;

    @NotNull
    @Min(0)
    @Column(name = "available_rooms", nullable = false)
    private Integer availableRooms;

    @NotNull
    @Min(0)
    @Column(name = "booked_rooms", nullable = false)
    @Builder.Default
    private Integer bookedRooms = 0;

    @NotNull
    @Min(0)
    @Column(name = "blocked_rooms", nullable = false)
    @Builder.Default
    private Integer blockedRooms = 0;

    @Column(name = "is_closed", nullable = false)
    @Builder.Default
    private Boolean isClosed = false;

    @Column(name = "close_reason", length = 120)
    private String closeReason;

    // ── Audit Fields ────────────────────────────────────────────────

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
