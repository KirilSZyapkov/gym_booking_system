"use client";

import { useState, useEffect } from "react";

import {
  Check,
  Activity,
  ArrowRight,
  Clock3,
  Dumbbell,
  MapPin,
  Sparkles,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trainer } from "@/drizzle/schemas/trainer-schema";
import { getAllTrainersAction, getTrainerByIdAction } from "@/actions/trainer.action";

const sessionTypes = [
  {
    title: "Strength training",
    description: "Focused lifting session with coach guidance.",
    icon: Dumbbell,
    accent: "bg-zinc-950 text-white",
  },
  {
    title: "Conditioning",
    description: "High-energy circuit for endurance and control.",
    icon: Activity,
    accent: "bg-amber-100 text-amber-800",
  },
  {
    title: "Mobility reset",
    description: "Recovery, range of motion, and better movement.",
    icon: Sparkles,
    accent: "bg-emerald-100 text-emerald-800",
  },
];

const availableSlots = [
  { time: "07:30", trainer: "Alex Morgan", spots: "4 spots" },
  { time: "12:00", trainer: "Maya Stone", spots: "2 spots" },
  { time: "18:30", trainer: "Chris Walker", spots: "Last spot" },
];


export default function AppointmentForm() {
  const [dayOfWeek, setDayOfWeek] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>("10");
  const [endTime, setEndTime] = useState<string | null>("11");
  const [listAllTrainers, setListAllTrainers] = useState<typeof trainer.$inferSelect[] | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<typeof trainer.$inferSelect | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      const listTrainers = await getAllTrainersAction();

      if ("message" in listTrainers) {
        setError(listTrainers.message);
        return;
      };

      setListAllTrainers(listTrainers);
    };

    fetch();
  }, []);

  

  console.log(listAllTrainers);
  console.log(selectedTrainer);

  async function loadTrainer(id: string) {
    const trainer = await getTrainerByIdAction(id);

    if("message" in trainer){
      setError(trainer.message);
      return
    };

    setSelectedTrainer(trainer);
  }

  async function createNewAppointment() {
    alert(dayOfWeek);
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1fr_22rem] lg:px-8">
      <div className="space-y-4">
        <Card className="rounded-lg border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Workout type</CardTitle>
            <CardDescription>
              Start with the session style you want to book.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {sessionTypes.map(({ title, description, icon: Icon, accent }) => (
                <button
                  key={title}
                  type="button"
                  className="group flex min-h-40 flex-col items-start rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-400/40"
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-lg ${accent}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 font-semibold text-zinc-950">
                    {title}
                  </span>
                  <span className="mt-2 text-sm leading-6 text-zinc-600">
                    {description}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Date and trainer</CardTitle>
            <CardDescription>
              Set your preferred day and choose who you train with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  className="h-11 bg-white"
                  onChange={(e) => { setDayOfWeek(e.target.value) }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainer">Trainer</Label>
                <select
                  id="trainer"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3 text-base text-zinc-950 outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  defaultValue="any"
                >
                  <option value="any" onClick={() => setSelectedTrainer(null)}>Any available trainer</option>
                  {listAllTrainers?.map(t => (
                    <option key={t.id} value={t.name} onClick={() => loadTrainer(t.id)}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {availableSlots.map((slot, index) => (
                
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${index === 0
                      ? "bg-zinc-950 text-white"
                      : "bg-white text-zinc-950 ring-1 ring-zinc-200"
                      }`}
                  >
                    {slot.time}
                  </span>
                
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Session notes</CardTitle>
            <CardDescription>
              Add anything your trainer should know before check-in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              placeholder="Goals, injuries, preferred focus..."
              className="w-full resize-none rounded-lg border border-input bg-white px-3 py-2 text-base leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            />
          </CardContent>
        </Card>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="rounded-lg border-zinc-200 bg-zinc-950 text-white shadow-xl shadow-zinc-950/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Booking summary
            </CardTitle>
            <CardDescription className="text-zinc-300">
              Review the details before reserving your spot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="rounded-lg bg-white p-4 text-zinc-950">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                  <Dumbbell className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold">Strength training</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    60 minute guided workout
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <Clock3 className="size-4 text-amber-300" aria-hidden="true" />
                <span>{(dayOfWeek && startTime && endTime) ? (`${dayOfWeek} - ${startTime}:${endTime}`) : ("--/--/-- - --:--")}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <UserRound
                  className="size-4 text-amber-300"
                  aria-hidden="true"
                />
                <span>{selectedTrainer ? selectedTrainer.name : "----------"}</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <MapPin className="size-4 text-amber-300" aria-hidden="true" />
                <span>Main strength floor</span>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  className="mt-0.5 size-5 shrink-0 text-emerald-300"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-emerald-50">
                  Your appointment is held after confirmation and appears in
                  your member schedule.
                </p>
              </div>
            </div>

            <Button onClick={createNewAppointment} className="cursor-pointer h-11 w-full bg-white text-zinc-950 hover:bg-zinc-100">
              Reserve appointment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>

          </CardContent>
        </Card>
      </aside>
    </section>
  )
}