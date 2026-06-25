import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";
import { trainer } from "./trainer-schema";

export const trainerSchedule = pgTable("trainerSchedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  trainerId: uuid("trainerId").references(() => trainer.id, { onDelete: "cascade" }).notNull(),
  dayOfWeek: integer("dayOfWeek").array().notNull(),
  startTime: text("startTime").notNull(),
  endTime: text("endTime").notNull()
})