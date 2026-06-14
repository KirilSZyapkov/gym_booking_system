import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock3,
  Dumbbell,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TimerReset,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: CalendarCheck,
    title: "Easy reservations",
    description: "Book your preferred training slot in a few taps.",
  },
  {
    icon: TimerReset,
    title: "Real-time planning",
    description: "See available times before you change your day.",
  },
  {
    icon: ShieldCheck,
    title: "Member-first access",
    description: "Your profile keeps every booking connected and secure.",
  },
];

const sessions = [
  {
    time: "07:30",
    title: "Strength floor",
    spots: "6 spots",
    accent: "bg-amber-100 text-amber-800",
  },
  {
    time: "12:00",
    title: "Mobility reset",
    spots: "4 spots",
    accent: "bg-emerald-100 text-emerald-800",
  },
  {
    time: "18:30",
    title: "HIIT circuit",
    spots: "2 spots",
    accent: "bg-zinc-950 text-white",
  },
];

const stats = [
  { value: "24/7", label: "booking access" },
  { value: "3 min", label: "average setup" },
  { value: "0 calls", label: "to reserve" },
];

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex w-fit items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              Smarter bookings for stronger routines
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-5xl lg:text-6xl">
              Book gym sessions without breaking your rhythm.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Gym Booking helps members reserve training slots, manage their
              schedule, and stay ready for every workout from any device.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/appointment"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-400/50"
              >
                Book a session
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-300/60"
              >
                Create account
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-zinc-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-zinc-950 p-3 shadow-2xl shadow-zinc-950/20">
              <div className="rounded-xl bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-zinc-950 text-white">
                      <Dumbbell className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        Today&apos;s schedule
                      </p>
                      <p className="text-xs text-zinc-500">
                        Pick your next slot
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Live
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-1.5">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className={`flex aspect-square items-center justify-center rounded-lg text-xs font-semibold ${
                        index === 2
                          ? "bg-zinc-950 text-white"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.title}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3"
                    >
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${session.accent}`}
                      >
                        {session.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-zinc-950">
                          {session.title}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {session.spots} available
                        </p>
                      </div>
                      <ArrowRight
                        className="size-4 shrink-0 text-zinc-400"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                      <Clock3 className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-950">
                        Next check-in starts soon
                      </p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        Reserve now and your spot is ready when you arrive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-zinc-950 text-white">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-normal text-zinc-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-amber-700">
              Built for active members
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-4xl">
              Keep training plans, availability, and account access in one
              place.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <Smartphone className="size-6 text-amber-700" aria-hidden="true" />
              <p className="mt-4 font-semibold text-zinc-950">
                Mobile ready
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                The layout stays clear, tappable, and fast on smaller screens.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <UsersRound className="size-6 text-amber-700" aria-hidden="true" />
              <p className="mt-4 font-semibold text-zinc-950">
                Member profiles
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Signed-in users can keep bookings tied to the right account.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 sm:col-span-2">
              <Activity className="size-6 text-amber-700" aria-hidden="true" />
              <p className="mt-4 font-semibold text-zinc-950">
                Less admin, more training
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                A focused booking flow gives members the information they need
                without making them wait for staff confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl bg-zinc-950 p-6 text-white shadow-xl shadow-zinc-950/10 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-amber-100">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Ready when you are
            </div>
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-normal sm:text-3xl">
              Start with an account, then reserve your next session.
            </h2>
          </div>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50"
          >
            Join Gym Booking
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
