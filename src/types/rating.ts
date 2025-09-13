import { Note } from "./note";

export type Rating = {
    id: string;
    userId: string;
    ratedUserId: string;
    groupId?: string;
    avatarUrl?: string;
    rating: number;
    notes?: Note[];
    createdAt: string;
    updatedAt: string;
    isAnonymous: boolean;
};