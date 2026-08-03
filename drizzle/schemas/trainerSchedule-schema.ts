import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";
import { trainers } from "./trainer-schema";
import { relations } from "drizzle-orm";

export const trainerSchedule = pgTable("trainerSchedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  trainerId: uuid("trainerId").references(() => trainers.id, { onDelete: "cascade" }).notNull().unique(),
  dayOfWeek: integer("dayOfWeek").array().notNull(),
  startTime: text("startTime").notNull(),
  endTime: text("endTime").notNull()
});

export const trainerScheduleRelations = relations(trainerSchedule, ({ one }) => ({
  trainer: one(trainers, {
    fields: [trainerSchedule.trainerId],
    references: [trainers.id]
  })
}))