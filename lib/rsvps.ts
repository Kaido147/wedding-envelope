import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicRsvp = {
  name: string;
};

export async function getConfirmedRsvps(): Promise<PublicRsvp[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("rsvps")
      .select("guest_name")
      .eq("status", "confirmed")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map((rsvp) => ({ name: rsvp.guest_name }));
  } catch {
    return [];
  }
}
