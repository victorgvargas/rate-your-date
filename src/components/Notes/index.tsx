"use client";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import styled from "styled-components";

type NotesProps = {
    notes: (Note & { author: User })[];
};

const NoteContainer = styled.div`
    border-top: 1px solid #eee;
    margin-top: 12px;
    padding-top: 12px;
`;

const NoteContent = styled.p`
    font-size: 14px;
    margin: 0 0 4px 0;
`;

const NoteMeta = styled.small`
    color: #6b7280;
`;

const Notes = ({ notes }: NotesProps) => {
    // Ensure notes is always an array
    const safeNotes = Array.isArray(notes) ? notes : [];

    return (
        <div>
            {safeNotes.map(note => (
                <NoteContainer key={note.id}>
                    <NoteContent>{note.content}</NoteContent>
                    <NoteMeta>By {note.author.username} on {new Date(note.createdAt).toLocaleDateString()}</NoteMeta>
                </NoteContainer>
            ))}
        </div>
    );
};

export default Notes;
