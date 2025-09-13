"use client";
import Feed from "@/components/Feed";
import styled from "styled-components";

const FeedSection = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
    return <FeedSection>{children}</FeedSection>;
}