import { requireRole } from "@/lib/auth-guard"

export default async function NewAppointmentPage() {
  await requireRole(["client"]);

  return (
    <h1>New Appointment</h1>
  )
}