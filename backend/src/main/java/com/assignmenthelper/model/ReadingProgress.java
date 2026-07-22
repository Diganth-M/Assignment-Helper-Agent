package com.assignmenthelper.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reading_progress")
public class ReadingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;

    @Column(name = "document_key", nullable = false)
    private String documentKey;

    @Column(name = "progress_percentage")
    private Integer progressPercentage = 0;

    @Column(name = "last_opened_chapter")
    private String lastOpenedChapter;
    
    @Column(name = "total_reading_time_seconds")
    private Long totalReadingTimeSeconds = 0L;

    @ElementCollection
    @CollectionTable(name = "completed_chapters", joinColumns = @JoinColumn(name = "progress_id"))
    @Column(name = "chapter_id")
    private Set<String> completedChapters = new HashSet<>();

    @Column(name = "last_opened_date")
    private LocalDateTime lastOpenedDate;

    @PrePersist
    protected void onCreate() {
        lastOpenedDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastOpenedDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getDocumentKey() { return documentKey; }
    public void setDocumentKey(String documentKey) { this.documentKey = documentKey; }
    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }
    public String getLastOpenedChapter() { return lastOpenedChapter; }
    public void setLastOpenedChapter(String lastOpenedChapter) { this.lastOpenedChapter = lastOpenedChapter; }
    public Set<String> getCompletedChapters() { return completedChapters; }
    public void setCompletedChapters(Set<String> completedChapters) { this.completedChapters = completedChapters; }
    public LocalDateTime getLastOpenedDate() { return lastOpenedDate; }
    public void setLastOpenedDate(LocalDateTime lastOpenedDate) { this.lastOpenedDate = lastOpenedDate; }
    public Long getTotalReadingTimeSeconds() { return totalReadingTimeSeconds; }
    public void setTotalReadingTimeSeconds(Long totalReadingTimeSeconds) { this.totalReadingTimeSeconds = totalReadingTimeSeconds; }
}
