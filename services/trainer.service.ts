import db from "@/drizzle/db";
import { trainer, Trainer } from "@/drizzle/schemas/trainer-schema";

export async function getAllTrainersService(): Promise<Trainer[]> {
  const allTrainersList = await db.query.trainer.findMany();

  return allTrainersList;
};

export async function getTrainerByIdService(id: string) {
  const trainer = await db.query.trainer.findFirst({
    where: (trainer, { eq }) => eq(trainer.id, id),
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
  
}