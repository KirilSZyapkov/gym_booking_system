import { createNewAppointmentService } from "@/services/appointment.service";

type Params = {
  clientId: string,
  trainerId: string,
  dayOfWeek: string,
  startTime: Date,
  endTime: Date,
};

export async function createNewAppointmentAction(data: Params) {

}