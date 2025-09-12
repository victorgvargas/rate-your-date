"use client";
import LoginCard, { Credentials } from "@/components/LoginCard";
import { Container, HeaderTitle } from "../login/page";
import { register } from "@/services/register";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function Page() {
    const toast = useToast();
    const router = useRouter();

    const handleRegister = async (credentials: Credentials) => {
        try {
            const data = await register(credentials.email, credentials.password);
            toast.success("Registration successful! Please log in.", "Success");
            // Handle successful registration (e.g., redirect)
            router.push("/login");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "An unexpected error occurred during registration.",
                "Registration Failed"
            );
        }
    };

    return (
        <Container>
            <HeaderTitle>Rate Your Date</HeaderTitle>
            <LoginCard
                label="Register"
                onSubmit={handleRegister}
                bottomLink={{ text: "Already have an account? Login", href: "/login" }}
            />
        </Container>
    );
}  