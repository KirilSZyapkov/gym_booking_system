import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { appointment } from "./appointment-schema";

export const roleEnum = pgEnum('role', ['owner', 'admin', 'manager', 'staff', 'client']);

export const client = pgTable("client", {
  id: text("id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});


export const clientRelations = relations(client, ({many})=>({
  appointments: many(appointment) 
}))