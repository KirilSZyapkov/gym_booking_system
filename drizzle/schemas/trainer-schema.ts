import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { trainerSchedule } from "./trainerSchedule-schema";

export const trainers = pgTable("trainers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Trainer = typeof trainers.$inferSelect;

export const trinerRelations = relations(trainers, ({ one }) => ({
  schedule: one(trainerSchedule, {
    fields: [trainers.id],
    references: [trainerSchedule.trainerId]
  })
}))