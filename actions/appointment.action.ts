import { createNewAppointmentService } from "@/services/appointment.service";

type Params = {
  clientId: string,
  trainerId: string,
  dayOfWeek: string,
  startTime: Date,
  endTime: Date,
};

export async function createNewAppointmentAction(data: Params) {
  try {
    const newAppointment = await createNewAppointmentService(data);

    return newAppointment;
    
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: "Faild to book appointment!"
    }
  }
}