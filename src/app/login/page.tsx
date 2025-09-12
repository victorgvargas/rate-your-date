"use client";
import LoginCard, { Credentials } from "@/components/LoginCard";
import { login } from "@/services/login";
import { useToast } from "@/hooks/useToast";
import { Fragment } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 16px;
`;

const HeaderTitle = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #ffffffff;
`;

export default function Page() {
    const toast = useToast();

    const handleLogin = async (credentials: Credentials) => {
        try {
            const data = await login(credentials.email, credentials.password);
            toast.success("Login successful! Welcome back.", "Success");
            // Handle successful login (e.g., redirect)
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "An unexpected error occurred during login.",
                "Login Failed"
            );
        }
    };

    return (
        <Container>
            <HeaderTitle>Rate Your Date</HeaderTitle>
            <LoginCard
                label="Login"
                onSubmit={handleLogin}
                bottomLink={{ text: "Don't have an account? Register", href: "/register" }}
            />
        </Container>
    );
}