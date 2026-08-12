import AppointmentForm from "@/components/client/appointmentForm";
import { CalendarDays } from "lucide-react";
import { requireRole } from "@/lib/auth-guard";


const bookingSteps = [
  "Choose workout",
  "Pick a trainer",
  "Confirm slot",
];

export default async function NewAppointmentPage() {
  const logedInUser = await requireRole(["client", "admin", "staff","owner"]);

  console.log("new appitment page",logedInUser);

  if(!logedInUser){
    return <div>Loading...</div>;
  }

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

      <AppointmentForm clientId={logedInUser.id}/>
    </div>
  );
}
