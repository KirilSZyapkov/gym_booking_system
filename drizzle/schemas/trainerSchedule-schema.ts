import { pgTable, uuid, integer, text, pgEnum } from "drizzle-orm/pg-core";
import { trainer } from "./trainer-schema";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";

export const scheduleDayOWeekEnum = pgEnum("dayOfWeek", DAYS_OF_WEEK_IN_ORDER);

export const trainerSchedule = pgTable("trainerSchedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  trainerId: uuid("trainerId").references(() => trainer.id, { onDelete: "cascade" }).notNull(),
  dayOfWeek: scheduleDayOWeekEnum("dayOfWeek").notNull(),
  startTime: text("startTime").notNull(),
  endTime: text("endTime").notNull()
})