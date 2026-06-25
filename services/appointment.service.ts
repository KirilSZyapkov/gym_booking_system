import db from "@/drizzle/db";
import { appointment } from "@/drizzle/schemas/appointment-schema";
import { eq } from "drizzle-orm";

type Params = {
  clientId: string,
  trainer: string,
  startTime: Date,
  endTime: Date,
}

export async function createNewAppointmentService(data: Params) {

}

export async function getAppointmentByTrainerIdService(trainerId: string) {
  
}

export async function getAppointmentByIdService(id: string) {
  
}

export async function getAllAppointmentsService() {
  
}

export async function updateAppointmentService(id: string, data: Partial<typeof appointment.$inferSelect>) {
  
}

export async function cancelAppointmentByIdService(id: string) {
  
}