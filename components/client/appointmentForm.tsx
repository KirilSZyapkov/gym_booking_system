"use client";

import {  ArrowRight,  Check,} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const availableSlots = [
  { time: "07:30", trainer: "Alex Morgan", spots: "4 spots" },
  { time: "12:00", trainer: "Maya Stone", spots: "2 spots" },
  { time: "18:30", trainer: "Chris Walker", spots: "Last spot" },
];

export default function AppointmentForm(){
  return(
    <div>
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
                      className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                        index === 0
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
  )
}