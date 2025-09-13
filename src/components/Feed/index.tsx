"use client";
import { Rating as RatingType } from "@/types/rating";
import Rating from "../Rating";
import styled from "styled-components";

type FeedProps = {
    ratings?: RatingType[];
};

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Feed = ({ ratings }: FeedProps) => {
    // Ensure ratings is always an array
    const safeRatings = Array.isArray(ratings) ? ratings : [];

    return (
        <FeedContainer>
            {safeRatings.map((rating) => (
                <Rating key={rating.id} rating={rating} />
            ))}
        </FeedContainer>
    );
};

export default Feed;
