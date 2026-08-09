"use server";

import { db } from "@/db";
import { leads, bookings } from "@/db/schema";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validace vstupu z finálního kontaktního formuláře
//
// Repozice 2026-08-09: povinná zůstávají jen jméno, e-mail a souhlas.
// Dřívější povinné pole `blocker` ("co vás nejvíc brzdí") a nepovinné
// `automationGoal` ("vize automatizace") nahradilo jediné nepovinné pole
// `additionalNotes` — konkrétní bolest se probírá až na konzultaci.
//
// `additionalNotes` se ukládá do sloupce `blocker`, protože ten je v
// db/schema.ts `notNull()` a je to jediné volné textové pole formuláře.
// Prázdná hodnota jde do DB jako "" (splňuje NOT NULL), ne jako null.
// ---------------------------------------------------------------------------

const leadSchema = z.object({
  name: z.string().min(1, "Vyplňte jméno").max(200),
  email: z.string().email("Zadejte platný e-mail"),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),
  companyUrl: z.string().url().max(500).optional().or(z.literal("")),
  toolsUsed: z.array(z.string().max(100)).max(50),
  toolsOther: z.string().max(300).optional().or(z.literal("")),
  automationGoal: z.string().max(2000).optional().or(z.literal("")),
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
    additionalNotes: formData.get("additionalNotes") || "",
    phone: formData.get("phone") || "",
    companyUrl: formData.get("companyUrl") || "",
    toolsUsed: formData.getAll("toolsUsed"),
    toolsOther: formData.get("toolsOther") || "",
    automationGoal: formData.get("automationGoal") || "",
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Neplatný formulář",
    };
  }

  const {
    name,
    email,
    additionalNotes,
    phone,
    companyUrl,
    toolsUsed,
    toolsOther,
    automationGoal,
  } = parsed.data;

  try {
    await db.insert(leads).values({
      name,
      email,
      // sloupec `blocker` je notNull() — prázdné pole ukládáme jako ""
      blocker: additionalNotes || "",
      phone: phone || null,
      companyUrl: companyUrl || null,
      toolsUsed,
      toolsOther: toolsOther || null,
      automationGoal: automationGoal || null,
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
