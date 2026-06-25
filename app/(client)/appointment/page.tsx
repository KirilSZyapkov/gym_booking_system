import AppointmentForm from "@/components/client/appointmentForm";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Clock3,
  Dumbbell,
  MapPin,
  ShieldCheck,
  Sparkles,
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

import { requireRole } from "@/lib/auth-guard";

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

const bookingSteps = [
  "Choose workout",
  "Pick a trainer",
  "Confirm slot",
];

export default async function NewAppointmentPage() {
  await requireRole(["client", "admin", "staff"]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <div className="mb-4 flex w-fit items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
              <CalendarDays className="size-4" aria-hidden="true" />
              New appointment
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-4xl lg:text-5xl">
              Reserve your next training session.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Pick the workout, trainer, and time that fit your day. The layout
              stays quick to scan and easy to tap from your phone.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:w-80 lg:grid-cols-1">
            {bookingSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-zinc-700">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

          <AppointmentForm/>
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

              <Button className="h-11 w-full bg-white text-zinc-950 hover:bg-zinc-100">
                Reserve appointment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
