package app.haven.hotel.models.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "review_replies", indexes = {
        @Index(name = "idx_review_replies_review_id", columnList = "review_id"),
        @Index(name = "idx_review_replies_parent_id", columnList = "parent_reply_id")
})
public class ReviewReply {

    @Id
    @Column(length = 36, nullable = false)
    private String id;

    // Root review (only for top-level replies)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private HotelReview review;

    // Parent reply (for nested replies)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_reply_id")
    private ReviewReply parentReply;

    // Children replies
    @OneToMany(mappedBy = "parentReply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewReply> replies;

    @NotBlank
    @Column(name = "replied_by", nullable = false, length = 36)
    private String repliedBy;

    @NotBlank
    @Column(name = "reply_text", nullable = false, columnDefinition = "TEXT")
    private String replyText;

    @Column(name = "is_edited", nullable = false)
    @Builder.Default
    private Boolean isEdited = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}