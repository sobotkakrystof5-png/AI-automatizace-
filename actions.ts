"use server";

import { db } from "@/db";
import { leads, bookings } from "@/db/schema";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validace vstupu z finálního kontaktního formuláře
// (3 povinná pole + 2 volitelná — viz sekce "Finální CTA sekce" v obsahovém dokumentu)
// ---------------------------------------------------------------------------

const leadSchema = z.object({
  name: z.string().min(1, "Vyplňte jméno").max(200),
  email: z.string().email("Zadejte platný e-mail"),
  blocker: z.string().min(1, "Popište, co vás brzdí").max(2000),
  phone: z.string().max(50).optional().or(z.literal("")),
  companyUrl: z.string().url().max(500).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "Je potřeba souhlasit se zpracováním údajů",
  }),
});

export type LeadFormState = {
  success: boolean;
  error?: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    blocker: formData.get("blocker"),
    phone: formData.get("phone") || "",
    companyUrl: formData.get("companyUrl") || "",
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Neplatný formulář",
    };
  }

  const { name, email, blocker, phone, companyUrl } = parsed.data;

  try {
    await db.insert(leads).values({
      name,
      email,
      blocker,
      phone: phone || null,
      companyUrl: companyUrl || null,
      source: "contact_form",
      consentGivenAt: new Date(),
      // retence 3 roky od udělení souhlasu — sladit s finálním zněním
      // Zásad ochrany osobních údajů po kontrole advokátem
      dataRetentionUntil: new Date(
        Date.now() + 3 * 365 * 24 * 60 * 60 * 1000
      ),
    });

    return { success: true };
  } catch (err) {
    console.error("submitLead failed:", err);
    return {
      success: false,
      error: "Něco se nepovedlo, zkuste to prosím znovu.",
    };
  }
}

// ---------------------------------------------------------------------------
// Zápis rezervace přijaté z webhooku ZakazIQ
// (ZakazIQ nadále řeší kalendář, potvrzení a SMS/e-mail připomínky;
// tahle funkce jen zrcadlí rezervaci do centrální databáze)
// ---------------------------------------------------------------------------

const bookingWebhookSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  type: z.enum(["consultation", "audit"]),
  scheduledAt: z.string().datetime(),
  externalBookingId: z.string().max(200),
  leadId: z.string().uuid().optional(),
});

export async function recordBookingFromWebhook(
  payload: unknown
): Promise<{ success: boolean; error?: string }> {
  const parsed = bookingWebhookSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Neplatná data z webhooku" };
  }

  const { name, email, phone, type, scheduledAt, externalBookingId, leadId } =
    parsed.data;

  try {
    await db.insert(bookings).values({
      leadId: leadId ?? null,
      name,
      email,
      phone: phone ?? null,
      type,
      status: "confirmed",
      scheduledAt: new Date(scheduledAt),
      externalBookingId,
      consentGivenAt: new Date(),
    });

    return { success: true };
  } catch (err) {
    console.error("recordBookingFromWebhook failed:", err);
    return { success: false, error: "Zápis rezervace selhal" };
  }
}
