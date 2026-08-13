import db from "@/drizzle/db";
import { appointments } from "@/drizzle/schemas/appointment-schema";
import { eq } from "drizzle-orm";

type Params = {
  clientId: string,
  trainerId: string,
  dayOfWeek: string,
  startTime: string,
  endTime: string,
}

export async function createNewAppointmentService(data: Params) {
const [newAppointment] = await db.insert(appointments).values(data).returning();

if(!newAppointment){
  throw new Error("APPOINTMENT_CREATION_FAILD");
};

return newAppointment;
}

export async function getAppointmentByTrainerIdService(trainerId: string) {
  
}

export async function getAppointmentByIdService(id: string) {
  
}

export async function getAllAppointmentsService() {
  
}

export async function updateAppointmentService(id: string, data: Partial<typeof appointments.$inferSelect>) {
  
}

export async function cancelAppointmentByIdService(id: string) {
  
}