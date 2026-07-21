import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// ENUMS
// ---------------------------------------------------------------------------

export const leadStatusEnum = pgEnum("lead_status", [
  "new",           // nový, ještě neřešeno
  "contacted",     // ozvali jsme se
  "qualified",     // má smysl jít dál
  "booked",        // domluvena konzultace/audit
  "converted",      // stal se klientem
  "closed",        // nemá smysl / neodpověděl / nevhodné
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "contact_form",   // finální CTA formulář na webu
  "booking_direct", // rovnou přes rezervaci (ZakazIQ), bez formuláře
  "referral",       // doporučení
  "other",
]);

export const bookingTypeEnum = pgEnum("booking_type", [
  "consultation",  // konzultace zdarma
  "audit",         // automatizační audit (4 999 Kč)
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",    // termín vytvořen, čeká na potvrzení
  "confirmed",  // potvrzeno (ZakazIQ poslal SMS/e-mail)
  "completed",  // proběhlo
  "cancelled",
  "no_show",
]);

// ---------------------------------------------------------------------------
// LEADS — poptávky z kontaktního formuláře / finální CTA sekce
// ---------------------------------------------------------------------------

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // povinná pole ve formuláři
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    blocker: text("blocker").notNull(), // "Co vás ve firmě aktuálně nejvíc zdržuje?"

    // volitelná pole ve formuláři
    phone: varchar("phone", { length: 50 }),
    companyUrl: varchar("company_url", { length: 500 }),

    // rozšířený intake (Fáze R9 redesignu 2026) — samostatná pole, ne
    // přepis `blocker`: jde o jinou otázku ("jaké nástroje dnes používáte"
    // / "co konkrétně chcete automatizovat" vs. "co vás brzdí")
    toolsUsed: jsonb("tools_used").$type<string[]>().notNull().default([]), // slugy z lib/tools.ts + volitelně "jiné" hodnoty
    toolsOther: varchar("tools_other", { length: 300 }),
    automationGoal: text("automation_goal"),

    status: leadStatusEnum("status").notNull().default("new"),
    source: leadSourceEnum("source").notNull().default("contact_form"),

    // interní poznámky (nikdy nezobrazovat klientovi)
    internalNotes: text("internal_notes"),

    // GDPR — souhlas se zpracováním a doba uchování dat
    // (viz sekce "Zásady ochrany osobních údajů" v obsahovém dokumentu)
    consentGivenAt: timestamp("consent_given_at", { withTimezone: true }),
    dataRetentionUntil: timestamp("data_retention_until", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: index("leads_email_idx").on(table.email),
    statusIdx: index("leads_status_idx").on(table.status),
  })
);

// ---------------------------------------------------------------------------
// BOOKINGS — rezervace konzultací a auditů
// Termínování/SMS připomínky reálně jede přes ZakazIQ; external_booking_id
// slouží k propojení, aby se nic neduplikovalo ručně.
// ---------------------------------------------------------------------------

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    leadId: uuid("lead_id").references(() => leads.id, {
      onDelete: "set null",
    }),

    // pokud rezervace vznikla přímo přes ZakazIQ bez formuláře,
    // leadId může být null a kontakt se dotáhne z těchto polí
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 50 }),

    type: bookingTypeEnum("type").notNull().default("consultation"),
    status: bookingStatusEnum("status").notNull().default("pending"),

    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),

    // vazba na externí systém (ZakazIQ)
    externalBookingId: varchar("external_booking_id", { length: 200 }),

    notes: text("notes"),

    // GDPR — souhlas a retence, pro případ kdy booking vznikne bez leadId
    consentGivenAt: timestamp("consent_given_at", { withTimezone: true }),
    dataRetentionUntil: timestamp("data_retention_until", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    scheduledAtIdx: index("bookings_scheduled_at_idx").on(table.scheduledAt),
    leadIdIdx: index("bookings_lead_id_idx").on(table.leadId),
  })
);

// ---------------------------------------------------------------------------
// CASE STUDIES — reference (Backlog šablona: problém — řešení — nástroje — výsledek)
// isPublished = false dokud nejsou min. 2–3 hotové reference (viz poznámky v dokumentu)
// ---------------------------------------------------------------------------

export const caseStudies = pgTable(
  "case_studies",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: varchar("slug", { length: 200 }).notNull().unique(),

    // pokud NDA nedovolí jméno klienta, použít obecné označení
    // (např. "Výrobní firma z Prahy")
    clientLabel: varchar("client_label", { length: 200 }).notNull(),
    industry: varchar("industry", { length: 200 }),

    problem: text("problem").notNull(),
    solution: text("solution").notNull(),
    tools: jsonb("tools").$type<string[]>().notNull().default([]), // ["n8n", "Make.com", ...]
    result: text("result").notNull(),

    isPublished: boolean("is_published").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    publishedIdx: index("case_studies_published_idx").on(table.isPublished),
  })
);

// ---------------------------------------------------------------------------
// RELATIONS
// ---------------------------------------------------------------------------

export const leadsRelations = relations(leads, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  lead: one(leads, {
    fields: [bookings.leadId],
    references: [leads.id],
  }),
}));
