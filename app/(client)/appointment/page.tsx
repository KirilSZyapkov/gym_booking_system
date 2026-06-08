import { requireRole } from "@/lib/auth-guard"

export default async function NewAppointmentPage() {
  await requireRole(["client", "admin", "staff"]);

  return (
    <h1>New Appointment</h1>
  )
}