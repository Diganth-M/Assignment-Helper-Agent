package com.assignmenthelper.dto;

public class DocumentNoteDto {
    private Long id;
    private String documentKey;
    private String chapterId;
    private String noteText;
    private Boolean isBookmark;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDocumentKey() { return documentKey; }
    public void setDocumentKey(String documentKey) { this.documentKey = documentKey; }
    public String getChapterId() { return chapterId; }
    public void setChapterId(String chapterId) { this.chapterId = chapterId; }
    public String getNoteText() { return noteText; }
    public void setNoteText(String noteText) { this.noteText = noteText; }
    public Boolean getIsBookmark() { return isBookmark; }
    public void setIsBookmark(Boolean isBookmark) { this.isBookmark = isBookmark; }
}
