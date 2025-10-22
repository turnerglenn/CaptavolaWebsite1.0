import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWaitlistSubmissionSchema = createInsertSchema(waitlistSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertWaitlistSubmission = z.infer<typeof insertWaitlistSubmissionSchema>;
export type WaitlistSubmission = typeof waitlistSubmissions.$inferSelect;
