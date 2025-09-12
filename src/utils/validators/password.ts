export const passwordValidator = (password: string): boolean | string => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password) || "Password must be at least 8 characters long and include a number and special character";
};