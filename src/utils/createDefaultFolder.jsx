import { supabase } from "../lib/supabaseClient";

export async function createDefaultFolder(user) {
  try {
    // ✅ Check if a default folder already exists
    const { data: existing, error: selectError } = await supabase
      .from("folders")
      .select("*")
      .eq("user_id", user.id)
      .eq("name", "root")
      .single();

    if (existing) return existing;

    // ✅ Insert new folder if not found
    const { data, error } = await supabase
      .from("folders")
      .insert([
        {
          user_id: user.id,
          name: "root",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error creating default folder:", err.message);
    return null;
  }
}
