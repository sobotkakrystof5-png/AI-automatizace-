CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show');--> statement-breakpoint
CREATE TYPE "public"."booking_type" AS ENUM('consultation', 'audit');--> statement-breakpoint
CREATE TYPE "public"."lead_source" AS ENUM('contact_form', 'booking_direct', 'referral', 'other');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'qualified', 'booked', 'converted', 'closed');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid,
	"name" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(50),
	"type" "booking_type" DEFAULT 'consultation' NOT NULL,
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"external_booking_id" varchar(200),
	"notes" text,
	"consent_given_at" timestamp with time zone,
	"data_retention_until" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"client_label" varchar(200) NOT NULL,
	"industry" varchar(200),
	"problem" text NOT NULL,
	"solution" text NOT NULL,
	"tools" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"result" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "case_studies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"blocker" text NOT NULL,
	"phone" varchar(50),
	"company_url" varchar(500),
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"source" "lead_source" DEFAULT 'contact_form' NOT NULL,
	"internal_notes" text,
	"consent_given_at" timestamp with time zone,
	"data_retention_until" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_scheduled_at_idx" ON "bookings" USING btree ("scheduled_at");--> statement-breakpoint
CREATE INDEX "bookings_lead_id_idx" ON "bookings" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "case_studies_published_idx" ON "case_studies" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");