"use client";
import styled from "styled-components";

type LoadingIndicatorProps = {
    isLoading: boolean;
};

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
    return (
        <div>
            {isLoading ? <Spinner /> : null}
        </div>
    );
};

export default LoadingIndicator;
