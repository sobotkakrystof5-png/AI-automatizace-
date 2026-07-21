ALTER TABLE "leads" ADD COLUMN "tools_used" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "tools_other" varchar(300);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "automation_goal" text;