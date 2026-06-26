"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [listAllTrainers, setListAllTrainers] = useState<typeof trainer.$inferSelect[] | null>(null);
  const [secetedTrainer, setSelectedTrainer] = useState<typeof trainer.$inferSelect | null>(null);

  async function createNewAppointment() {
    alert("hi");
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

                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainer">Trainer</Label>
                <select
                  id="trainer"
                  className="h-11 w-full rounded-lg border border-input bg-white px-3 text-base text-zinc-950 outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  defaultValue="any"
                >
                  <option value="any">Any available trainer</option>
                  <option value="alex">Alex Morgan</option>
                  <option value="maya">Maya Stone</option>
                  <option value="chris">Chris Walker</option>
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {availableSlots.map((slot, index) => (
                <button
                  key={slot.time}
                  type="button"
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-left transition-colors hover:border-zinc-300 hover:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-400/40"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${index === 0
                      ? "bg-zinc-950 text-white"
                      : "bg-white text-zinc-950 ring-1 ring-zinc-200"
                      }`}
                  >
                    {slot.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-zinc-950">
                      {slot.trainer}
                    </span>
                    <span className="block text-sm text-zinc-500">
                      {slot.spots} available
                    </span>
                  </span>
                  {index === 0 ? (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                  ) : (
                    <ArrowRight
                      className="size-4 shrink-0 text-zinc-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
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
                <span>Today, 07:30 - 08:30</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <UserRound
                  className="size-4 text-amber-300"
                  aria-hidden="true"
                />
                <span>Alex Morgan</span>
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