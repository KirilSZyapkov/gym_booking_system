"use server";

import { getAllTrainersService, getTrainerByIdService, loadTrainerScheduleByIdAndDayOfWeekService } from "@/services/trainer.service";

export async function getAllTrainersAction() {
  try {
    const listAllTrainer = await getAllTrainersService();

    return listAllTrainer;

  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Faild to load all trainers records!"
    }
  }
}

export async function getTrainerByIdAction(id: string) {
  try {
    const trainer = await getTrainerByIdService(id);
    
    return trainer;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Faild to load trainer!"
    }
  }
}

export async function loadTrainerScheduleByIdAndDayOfWeekAction(id: string, dayOfWeek: string) {
  try {
    const listTrainerSchedule = await loadTrainerScheduleByIdAndDayOfWeekService(id, dayOfWeek);

    return listTrainerSchedule;
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong!"
    }
  }
  
}