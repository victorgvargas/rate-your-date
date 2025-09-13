import { supabase } from "@/utils/supabase/client";

export async function getNotesByRatingId(ratingId: string) {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('rating_id', ratingId);

    if (error) {
        throw error;
    }

    return data;
}