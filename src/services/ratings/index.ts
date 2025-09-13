import { Rating } from "@/types/rating";
import { supabase } from "@/utils/supabase/client";
import { getUserGroups } from "../groups";

export async function createRating(ratingData: Rating) {
    // Placeholder implementation

    const { data, error } = await supabase
        .from("ratings")
        .insert([ratingData])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data?.[0];
}

export async function getUserRatings(userId: string) {
    const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getGroupRatings(groupId: string, start: number, count: number) {
    const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .eq("group_id", groupId)
        .range(start, start + count - 1);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getPublicRatings(start: number, count: number) {
    const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .is("group_id", null)
        .range(start, start + count - 1);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getAllRatings(start: number, count: number) {
    try {
        // Step 1: Get user
        const userResponse = await supabase.auth.getUser();
        const userId = userResponse.data?.user?.id;

        // Step 2: Always start with public ratings
        const publicRatings = await getPublicRatings(start, count);

        // Step 3: If no user, return public only
        if (!userId) {
            return publicRatings;
        }

        // Step 4: Try to get user groups
        let groupRatings: any[] = [];
        try {
            const userGroups = await getUserGroups(userId);

            if (userGroups && Array.isArray(userGroups) && userGroups.length > 0) {
                // Process each group individually to avoid Promise.all issues
                for (let i = 0; i < userGroups.length; i++) {
                    const group = userGroups[i];

                    if (group && group.group_id) {
                        try {
                            const ratings = await getGroupRatings(group.group_id, start, count);
                            if (ratings && Array.isArray(ratings)) {
                                groupRatings.push(...ratings);
                            }
                        } catch (groupError) {
                            console.error(`Error fetching ratings for group ${group.group_id}:`, groupError);
                        }
                    }
                }
            }
        } catch (groupsError) {
            console.error('Error fetching user groups:', groupsError);
        }

        // Step 5: Combine all ratings
        const allRatings = [...groupRatings, ...publicRatings];
        return allRatings;
    } catch (error) {
        console.error('Error in getAllRatings:', error);
        // Always fallback to public ratings
        try {
            return await getPublicRatings(start, count);
        } catch (fallbackError) {
            console.error('Even fallback failed:', fallbackError);
            return [];
        }
    }
}

export async function updateRating(ratingId: string, ratingData: Partial<Rating>) {
    const { data, error } = await supabase
        .from("ratings")
        .update(ratingData)
        .eq("id", ratingId)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data?.[0];
}

