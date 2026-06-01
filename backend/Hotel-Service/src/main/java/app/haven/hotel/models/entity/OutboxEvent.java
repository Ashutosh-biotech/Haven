package app.haven.hotel.models.entity;

import app.haven.hotel.models.enums.OutboxStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "outbox_events", indexes = {
        @Index(name = "idx_outbox_aggregate_id", columnList = "aggregate_id"),
        @Index(name = "idx_outbox_status", columnList = "status")
})
public class OutboxEvent {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    @NotBlank
    @Column(name = "aggregate_type", nullable = false, length = 50)
    private String aggregateType;

    @NotBlank
    @Column(name = "aggregate_id", nullable = false, length = 36)
    private String aggregateId;

    @NotBlank
    @Column(name = "event_type", nullable = false, length = 80)
    private String eventType;

    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private String payload;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private OutboxStatus status = OutboxStatus.PENDING;

    @Min(0)
    @Column(name = "retry_count", nullable = false)
    @Builder.Default
    private Integer retryCount = 0;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
}
