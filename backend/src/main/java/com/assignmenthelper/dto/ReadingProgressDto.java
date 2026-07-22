package com.assignmenthelper.dto;

import java.util.Set;

public class ReadingProgressDto {
    private String documentKey;
    private Integer progressPercentage;
    private String lastOpenedChapter;
    private Long totalReadingTimeSeconds;
    private Set<String> completedChapters;

    // Getters and Setters
    public String getDocumentKey() { return documentKey; }
    public void setDocumentKey(String documentKey) { this.documentKey = documentKey; }
    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }
    public String getLastOpenedChapter() { return lastOpenedChapter; }
    public void setLastOpenedChapter(String lastOpenedChapter) { this.lastOpenedChapter = lastOpenedChapter; }
    public Long getTotalReadingTimeSeconds() { return totalReadingTimeSeconds; }
    public void setTotalReadingTimeSeconds(Long totalReadingTimeSeconds) { this.totalReadingTimeSeconds = totalReadingTimeSeconds; }
    public Set<String> getCompletedChapters() { return completedChapters; }
    public void setCompletedChapters(Set<String> completedChapters) { this.completedChapters = completedChapters; }
}
