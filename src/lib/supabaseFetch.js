// src/lib/supabaseFetch.js
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function fetchFolders(user) {
  if (!user) throw new Error("User not authenticated");

  const res = await fetch(`${SUPABASE_URL}/rest/v1/folders?select=*&user_id=eq.${user.id}&name=eq.root`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${user.access_token}`, // session token
      Accept: "application/json", // fixes 406
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching folders: ${res.statusText}`);
  }

  return await res.json();
}
