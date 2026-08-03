import { pgTable, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";
import { client } from "./client-schema";
import { relations } from "drizzle-orm";
import { trainers } from "./trainer-schema";

export const appointmentStatusEnum = pgEnum('appointment_status', [
  // 'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
]);

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: text("clientId").references(() => client.id),
  trainerId: uuid("trainerId").references(() => trainers.id, { onDelete: "cascade" }).notNull(),
  dayOfWeek: text("dayOfWeek").notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: appointmentStatusEnum('status').default('confirmed'),
  sessionNote: text("sessionNote"),
  cancelledAt: timestamp('cancelled_at'),
  cancellationReason: text('cancellation_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointmentRelations = relations(appointments, ({ one }) => ({
  client: one(client, {
    fields: [appointments.clientId],
    references: [client.id]
  })
}))