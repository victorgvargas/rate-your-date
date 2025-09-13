"use client";
import { useToast } from "@/hooks/useToast";
import { Rating as RatingType } from "@/types/rating";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Notes from "../Notes";

export type RatingProps = {
    rating: RatingType;
};

const Post = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: #fff;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
`;

const Username = styled.span`
    font-weight: bold;
    font-size: 16px;
`;

const RatingScore = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #fbbf24; /* Amber color for stars */
    margin-bottom: 8px;
`;

const ShowNotes = styled.button`
    background: none;
    border: none;
    color: #3b82f6; /* Blue color for link */
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    margin-top: 8px;

    &:hover {
        text-decoration: underline;
    }
`;

const Rating = ({ rating }: RatingProps) => {
    const {
        id,
        rating: score,
        createdAt,
        isAnonymous,
        ratedUserId,
        updatedAt,
        userId,
        avatarUrl,
        notes
    } = rating;
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [showNotes, setShowNotes] = useState(false);
    const toast = useToast();
    const [fullNotes, setFullNotes] = useState<
        {
            author: User;
            id: string;
            ratingId: string;
            authorId: string;
            content: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);

    const mapFullNotes = async () => {
        try {
            // Ensure notes is always an array
            const safeNotes = Array.isArray(notes) ? notes : [];

            // For now, just add placeholder author data since we don't have a working user service
            const notesWithAuthors = safeNotes.map((note) => ({
                ...note,
                author: {
                    id: note.authorId,
                    username: "Anonymous User", // Placeholder since we can't fetch real data
                    email: "",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }));

            return notesWithAuthors;
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "An unexpected error occurred while processing notes.",
                "Error"
            );
            return [];
        }
    };

    useEffect(() => {
        // For now, just use placeholder data or the rating data itself
        if (!isAnonymous && ratedUserId) {
            // Use a placeholder name or extract from rating data
            setUser({
                name: `User ${ratedUserId.substring(0, 8)}` // Use part of the ID as a display name
            });
        } else if (!isAnonymous) {
            // Fallback if ratedUserId is undefined
            setUser({
                name: "Unknown User"
            });
        }
    }, [ratedUserId, isAnonymous]); useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await mapFullNotes();
            setFullNotes(notesData ?? []);
        };

        fetchNotes();
    }, [notes]);

    return (
        <Post>
            <PostHeader>
                <Avatar src={avatarUrl || "https://via.placeholder.com/40x40/cccccc/ffffff?text=👤"} alt="User Avatar" />
                <Username>{isAnonymous ? "Anonymous" : user?.name || "Unknown User"}</Username>
            </PostHeader>
            <RatingScore>{'★'.repeat(score)}{'☆'.repeat(5 - score)}</RatingScore>
            {notes && (
                <ShowNotes onClick={() => setShowNotes(!showNotes)}>
                    {showNotes ? "Hide Notes" : "Show Notes"}
                </ShowNotes>
            )}
            {showNotes && (
                <Notes notes={fullNotes} />
            )}
        </Post>
    );
}

export default Rating;