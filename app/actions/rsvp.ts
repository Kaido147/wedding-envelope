"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type RsvpActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: {
    guestName?: string;
    companionName?: string;
  };
};

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function submitRsvp(_previousState: RsvpActionState, formData: FormData): Promise<RsvpActionState> {
  const guestName = normalizeName(String(formData.get("guestName") ?? ""));
  const companionName = normalizeName(String(formData.get("companionName") ?? ""));
  const bringingPlusOne = formData.get("bringingPlusOne") === "on";
  const fieldErrors: RsvpActionState["fieldErrors"] = {};

  if (!guestName) fieldErrors.guestName = "Please enter your full name.";
  else if (guestName.length > 100) fieldErrors.guestName = "Your name must be 100 characters or fewer.";

  if (companionName.length > 100) fieldErrors.companionName = "Your companion's name must be 100 characters or fewer.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please correct the highlighted field.", fieldErrors };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("rsvps").insert({
      guest_name: guestName,
      normalized_guest_name: guestName.toLocaleLowerCase(),
      bringing_plus_one: bringingPlusOne,
      companion_name: bringingPlusOne && companionName ? companionName : null,
      status: "confirmed",
    });

    if (error?.code === "23505") {
      return { status: "error", message: "This name has already confirmed attendance." };
    }
    if (error) throw error;

    revalidatePath("/");
    return {
      status: "success",
      message: bringingPlusOne ? "Your attendance for two has been confirmed." : "Your attendance has been confirmed.",
    };
  } catch {
    return { status: "error", message: "We could not save your RSVP right now. Please try again shortly." };
  }
}
