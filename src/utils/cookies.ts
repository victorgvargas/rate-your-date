// Cookie utility functions for client-side cookie management

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
}

export const setCookie = (name: string, value: string, days: number = 7) => {
    const maxAge = days * 24 * 60 * 60; // Convert days to seconds
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; secure; samesite=strict`;
};

export const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const getUserProfile = (): UserProfile | null => {
    const profileCookie = getCookie('user-profile');
    if (!profileCookie) return null;

    try {
        return JSON.parse(decodeURIComponent(profileCookie));
    } catch (error) {
        console.error('Error parsing user profile cookie:', error);
        return null;
    }
};

export const setUserProfile = (profile: UserProfile) => {
    const profileString = encodeURIComponent(JSON.stringify(profile));
    setCookie('user-profile', profileString);
};

export const clearAuthCookies = () => {
    deleteCookie('auth-token');
    deleteCookie('user-profile');
};
