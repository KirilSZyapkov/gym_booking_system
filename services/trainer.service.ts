import db from "@/drizzle/db";
import { Trainer } from "@/drizzle/schemas/trainer-schema";
import { appointments} from "@/drizzle/schemas/appointment-schema";
import { eq, and } from 'drizzle-orm';

export async function getAllTrainersService(): Promise<Trainer[]> {
  const allTrainersList = await db.query.trainers.findMany();

  return allTrainersList;
};

export async function getTrainerByIdService(id: string) {
  const trainer = await db.query.trainers.findFirst({
    where: (trainers, { eq }) => eq(trainers.id, id),
    with: {
      schedule: true
    }
  });

  if (!trainer) {
    throw new Error("TRAINER_NOT_FOUND");
  };

  return trainer;
}

export async function loadTrainerScheduleByIdAndDayOfWeekService(id: string, dayOfWeek: string) {
  const pickedTrainer = await getTrainerByIdService(id);
  
  
  const listOfAppointments = await db.query.appointments.findMany({
    where: (
      and(
        eq(appointments.trainerId, pickedTrainer.id),
        eq(appointments.dayOfWeek, dayOfWeek)
      )
    ),

  });
  console.log(listOfAppointments);

  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ];

  const freeHourSlots = listOfAppointments.map(a => {
    const starthour = a.startTime.toString()
  });

  // return listOfAppointments.length > 0 ? listOfAppointments : hours;
  return hours;
}