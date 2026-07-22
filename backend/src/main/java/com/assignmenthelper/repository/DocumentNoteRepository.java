package com.assignmenthelper.repository;

import com.assignmenthelper.model.DocumentNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentNoteRepository extends JpaRepository<DocumentNote, Long> {
    List<DocumentNote> findByUserIdAndDocumentKey(Long userId, String documentKey);
    List<DocumentNote> findByUserIdAndDocumentKeyAndChapterId(Long userId, String documentKey, String chapterId);
}
