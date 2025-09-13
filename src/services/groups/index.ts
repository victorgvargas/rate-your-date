import { supabase } from "@/utils/supabase/client";

export async function getUserGroups(userId: string) {
    try {
        const { data, error } = await supabase
            .from("group_members")
            .select("group_id")
            .eq("user_id", userId);

        if (error) {
            console.error('Error fetching user groups:', error);
            return [];
        }

        // Ensure we always return an array
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Unexpected error in getUserGroups:', error);
        return [];
    }
}