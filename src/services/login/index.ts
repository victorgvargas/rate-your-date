import { supabase } from "@/utils/supabase/client";
import { setCookie, setUserProfile, UserProfile } from "@/utils/cookies";

export async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    // Set cookies with user data
    if (data.user && data.session) {
        // Set auth token cookie (7 days expiry)
        setCookie('auth-token', data.session.access_token, 7);

        // Set user profile cookie
        const userProfile: UserProfile = {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
            avatar: data.user.user_metadata?.avatar_url || null,
        };

        setUserProfile(userProfile);
    }

    return data;
}