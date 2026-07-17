import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// DATABASE_URL bereme z Neon dashboardu (Connection string, pooled connection)
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
