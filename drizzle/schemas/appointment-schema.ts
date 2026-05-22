import { pgTable, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";
import { client } from "./client-schema";
import { relations } from "drizzle-orm";

export const appointmentStatusEnum = pgEnum('appointment_status', [
  // 'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
]);

export const appointment = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: text("clientId").references(() => client.id),
  trainer: text("trainer").notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: appointmentStatusEnum('status').default('confirmed'),
  cancelledAt: timestamp('cancelled_at'),
  cancellationReason: text('cancellation_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointmentRelations = relations(appointment, ({ one }) => ({
  client: one(client, {
    fields: [appointment.clientId],
    references: [client.id]
  })
}))