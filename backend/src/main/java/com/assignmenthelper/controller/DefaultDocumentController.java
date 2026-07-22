package com.assignmenthelper.controller;

import com.assignmenthelper.dto.DocumentNoteDto;
import com.assignmenthelper.dto.ReadingProgressDto;
import com.assignmenthelper.service.DefaultDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/default-documents")
public class DefaultDocumentController {

    @Autowired
    private DefaultDocumentService defaultDocumentService;

    @GetMapping("/{documentKey}/content")
    public ResponseEntity<?> getDocumentContent(@PathVariable String documentKey) {
        try {
            String content = defaultDocumentService.getDefaultDocumentContent(documentKey);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Could not load document content: " + e.getMessage()));
        }
    }

    @GetMapping("/{documentKey}/file")
    public ResponseEntity<Resource> getDocumentFile(@PathVariable String documentKey) {
        try {
            Resource file = defaultDocumentService.getDefaultDocumentFile(documentKey);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{documentKey}/progress")
    public ResponseEntity<ReadingProgressDto> getReadingProgress(@PathVariable String documentKey) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ReadingProgressDto progress = defaultDocumentService.getReadingProgress(userDetails.getUsername(), documentKey);
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/{documentKey}/progress")
    public ResponseEntity<ReadingProgressDto> saveReadingProgress(
            @PathVariable String documentKey, 
            @RequestBody ReadingProgressDto dto) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        dto.setDocumentKey(documentKey);
        ReadingProgressDto savedProgress = defaultDocumentService.saveReadingProgress(userDetails.getUsername(), dto);
        return ResponseEntity.ok(savedProgress);
    }

    @GetMapping("/{documentKey}/notes")
    public ResponseEntity<List<DocumentNoteDto>> getDocumentNotes(
            @PathVariable String documentKey,
            @RequestParam(required = false) String chapterId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<DocumentNoteDto> notes = defaultDocumentService.getDocumentNotes(userDetails.getUsername(), documentKey, chapterId);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/{documentKey}/notes")
    public ResponseEntity<DocumentNoteDto> saveDocumentNote(
            @PathVariable String documentKey,
            @RequestBody DocumentNoteDto dto) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        dto.setDocumentKey(documentKey);
        DocumentNoteDto savedNote = defaultDocumentService.saveDocumentNote(userDetails.getUsername(), dto);
        return ResponseEntity.ok(savedNote);
    }

    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<?> deleteDocumentNote(@PathVariable Long noteId) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            defaultDocumentService.deleteDocumentNote(userDetails.getUsername(), noteId);
            return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Note deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }
}
