package com.assignmenthelper.service;

import com.assignmenthelper.dto.DocumentNoteDto;
import com.assignmenthelper.dto.ReadingProgressDto;
import com.assignmenthelper.model.DocumentNote;
import com.assignmenthelper.model.ReadingProgress;
import com.assignmenthelper.model.User;
import com.assignmenthelper.repository.DocumentNoteRepository;
import com.assignmenthelper.repository.ReadingProgressRepository;
import com.assignmenthelper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultDocumentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReadingProgressRepository readingProgressRepository;

    @Autowired
    private DocumentNoteRepository documentNoteRepository;

    public String getDefaultDocumentContent(String documentKey) throws IOException {
        String filename = "default-documents/content/" + documentKey + ".json";
        Resource resource = new ClassPathResource(filename);
        if (!resource.exists()) {
            throw new RuntimeException("Default document content not found: " + documentKey);
        }
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    public Resource getDefaultDocumentFile(String documentKey) {
        String filename = "default-documents/" + documentKey + ".pdf";
        Resource resource = new ClassPathResource(filename);
        if (!resource.exists()) {
            throw new RuntimeException("Default document file not found: " + documentKey);
        }
        return resource;
    }

    public ReadingProgressDto getReadingProgress(String username, String documentKey) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReadingProgress progress = readingProgressRepository.findByUserIdAndDocumentKey(user.getId(), documentKey)
                .orElse(new ReadingProgress());
        
        ReadingProgressDto dto = new ReadingProgressDto();
        dto.setDocumentKey(documentKey);
        dto.setProgressPercentage(progress.getProgressPercentage() != null ? progress.getProgressPercentage() : 0);
        dto.setLastOpenedChapter(progress.getLastOpenedChapter());
        dto.setTotalReadingTimeSeconds(progress.getTotalReadingTimeSeconds() != null ? progress.getTotalReadingTimeSeconds() : 0L);
        dto.setCompletedChapters(progress.getCompletedChapters());
        
        return dto;
    }

    public ReadingProgressDto saveReadingProgress(String username, ReadingProgressDto dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReadingProgress progress = readingProgressRepository.findByUserIdAndDocumentKey(user.getId(), dto.getDocumentKey())
                .orElse(new ReadingProgress());

        progress.setUser(user);
        progress.setDocumentKey(dto.getDocumentKey());
        progress.setProgressPercentage(dto.getProgressPercentage());
        progress.setLastOpenedChapter(dto.getLastOpenedChapter());
        progress.setTotalReadingTimeSeconds(dto.getTotalReadingTimeSeconds());
        
        if (dto.getCompletedChapters() != null) {
            if (progress.getCompletedChapters() != null) {
                progress.getCompletedChapters().clear();
                progress.getCompletedChapters().addAll(dto.getCompletedChapters());
            } else {
                progress.setCompletedChapters(dto.getCompletedChapters());
            }
        }

        progress = readingProgressRepository.save(progress);
        return dto; // Returning original DTO is fine here as it reflects saved state
    }

    public List<DocumentNoteDto> getDocumentNotes(String username, String documentKey, String chapterId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<DocumentNote> notes;
        if (chapterId != null && !chapterId.isEmpty()) {
            notes = documentNoteRepository.findByUserIdAndDocumentKeyAndChapterId(user.getId(), documentKey, chapterId);
        } else {
            notes = documentNoteRepository.findByUserIdAndDocumentKey(user.getId(), documentKey);
        }

        return notes.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public DocumentNoteDto saveDocumentNote(String username, DocumentNoteDto dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DocumentNote note = new DocumentNote();
        if (dto.getId() != null) {
            note = documentNoteRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Note not found"));
            if (!note.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        }

        note.setUser(user);
        note.setDocumentKey(dto.getDocumentKey());
        note.setChapterId(dto.getChapterId());
        note.setNoteText(dto.getNoteText());
        note.setIsBookmark(dto.getIsBookmark() != null ? dto.getIsBookmark() : false);

        note = documentNoteRepository.save(note);
        return mapToDto(note);
    }
    
    public void deleteDocumentNote(String username, Long noteId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        DocumentNote note = documentNoteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
                
        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        documentNoteRepository.delete(note);
    }

    private DocumentNoteDto mapToDto(DocumentNote note) {
        DocumentNoteDto dto = new DocumentNoteDto();
        dto.setId(note.getId());
        dto.setDocumentKey(note.getDocumentKey());
        dto.setChapterId(note.getChapterId());
        dto.setNoteText(note.getNoteText());
        dto.setIsBookmark(note.getIsBookmark());
        return dto;
    }
}
