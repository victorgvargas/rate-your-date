"use client";
import styled from 'styled-components';
import { useForm, SubmitHandler } from "react-hook-form"
import { passwordValidator } from '@/utils/validators/password';
import { emailValidator } from '@/utils/validators/email';
import LoadingIndicator from '../LoadingIndicator';

export type Credentials = {
    email: string;
    password: string;
};

type LoginCardProps = {
    label: string;
    onSubmit: SubmitHandler<Credentials>;
    bottomLink?: { text: string; href: string };
};

const Card = styled.div`
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 24px;
    max-width: 500px;
    width: 100%;
    margin: 16px auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'hasError',
}) <{ hasError?: boolean }>`
    margin-bottom: 8px;
    padding: 12px;
    font-size: 16px;
    border: 2px solid ${props => props.hasError ? '#ef4444' : '#e5e7eb'};
    border-radius: 6px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: ${props => props.hasError ? '#ef4444' : '#3b82f6'};
        box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;

    &:hover {
        background-color: #005bb5;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.span`
    color: #ef4444;
    font-size: 12px;
    margin-bottom: 12px;
    margin-top: -4px;
    display: block;
    padding-left: 4px;
    font-weight: 500;
`;

const BottomLink = styled.a`
    margin-top: 12px;
    font-size: 14px;
    color: #0070f3;
    text-align: center;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        color: #005bb5;
    }
    display: block;
    padding-left: 4px;
    font-weight: 500;
`;

const LoginCard = ({ label, onSubmit, bottomLink }: LoginCardProps) => {
    const {
        register,
        handleSubmit,
        formState: { isLoading, isSubmitting, errors, isValid, dirtyFields },
        reset,
        watch
    } = useForm<Credentials>({
        mode: 'onChange', // Validate on change for better UX
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const watchedFields = watch(); // Watch all fields for real-time validation

    const onFormSubmit = async (data: Credentials) => {
        try {
            await onSubmit(data);
            reset(); // Reset form after successful submission
        } catch (error) {
            // Error handling is done in parent component
            console.error('Form submission error:', error);
        }
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit(onFormSubmit)}>
                <Input
                    type="email"
                    placeholder="Email"
                    hasError={!!errors.email}
                    {...register("email", {
                        required: "Email is required",
                        validate: emailValidator
                    })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                <Input
                    type="password"
                    placeholder="Password"
                    hasError={!!errors.password}
                    {...register("password", {
                        required: "Password is required",
                        validate: passwordValidator
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                <Button
                    type="submit"
                    disabled={isSubmitting || !isValid || (!dirtyFields.email || !dirtyFields.password)}
                >
                    {isSubmitting ? <LoadingIndicator isLoading={isSubmitting} /> : label}
                </Button>

                {bottomLink && <BottomLink href={bottomLink.href}>{bottomLink.text}</BottomLink>}
            </Form>
        </Card>
    );
};

export default LoginCard;