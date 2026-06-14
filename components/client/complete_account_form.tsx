"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Dumbbell,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { createNewClientAction } from "@/actions/client.action";
import type { user } from "@/drizzle/schemas/auth-schema";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(40, "Name must be at most 40 characters."),
  email: z.email().min(1, "Enter your email address."),
  phone: z.string().min(10, "Phone number must be at least 10 characters."),
});

export default function CompleteAccountForm({
  authUser,
}: {
  authUser: typeof user.$inferSelect;
}) {
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: authUser.name ?? "",
      email: authUser.email ?? "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsCompleting(true);

    const res = await createNewClientAction({
      id: authUser.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "client",
    });

    if ("message" in res) {
      toast.error(res.message, {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties,
      });
      setIsCompleting(false);
      return;
    }

    toast.success("Profile completed successfully.", {
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    });

    setIsCompleting(false);
    form.reset();
    router.push("/");
    // router.refresh();
  }

  return (
    <section className="grid w-full max-w-5xl items-center gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
      <div className="flex flex-col gap-5">
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 lg:hidden"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>

        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg shadow-amber-900/10 sm:size-14">
            <Dumbbell className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-amber-700">
              Gym Booking
            </p>
            <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-normal text-zinc-950 sm:text-4xl">
              Finish your profile before your next session.
            </h1>
            <p className="mt-3 max-w-md text-base leading-7 text-zinc-600">
              Add the details the gym needs for reservations, reminders, and
              a smoother check-in from any device.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-center gap-3 rounded-xl border border-amber-200/70 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Ready to book</p>
              <p className="text-sm leading-5 text-zinc-600">
                Your profile unlocks appointments and schedule updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Account verified</p>
              <p className="text-sm leading-5 text-zinc-600">
                You are signed in as {authUser.email}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full border-amber-100/80 bg-white/95 shadow-2xl shadow-amber-950/10 backdrop-blur sm:max-w-2xl lg:justify-self-end">
        <CardHeader className="gap-4 px-5 pt-5 sm:px-7 sm:pt-7">
          <Link
            href="/"
            className="mb-1 hidden w-fit items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950 lg:flex"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>

          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <BadgeCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                Complete account
              </CardTitle>
              <CardDescription className="mt-1 max-w-md text-pretty text-zinc-600">
                Confirm your contact details so your bookings stay connected to
                the right gym profile.
              </CardDescription>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex size-11 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
              {authUser.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-zinc-950">
                {authUser.name}
              </p>
              <p className="truncate text-sm text-zinc-600">
                {authUser.email}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 sm:px-7">
          <form
            id="complete-account-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="gap-4 sm:grid sm:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="complete-account-name">
                      Full name
                    </FieldLabel>
                    <div className="relative">
                      <UserRound
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id="complete-account-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ivan Petrov"
                        autoComplete="name"
                        className="h-12 bg-white pl-9"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="complete-account-email">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id="complete-account-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="ivan@example.com"
                        autoComplete="email"
                        type="email"
                        className="h-12 bg-white pl-9"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="sm:col-span-2"
                  >
                    <FieldLabel htmlFor="complete-account-phone">
                      Phone number
                    </FieldLabel>
                    <div className="relative">
                      <Phone
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id="complete-account-phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="0888 888 888"
                        autoComplete="tel"
                        className="h-12 bg-white pl-9"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="border-amber-100/80 bg-amber-50/70 p-5 sm:p-7">
          <Field className="gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "outline",
                  className: "h-11 w-full bg-white px-4 sm:w-auto",
                })}
              >
                Cancel
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isCompleting}
                className="h-11 w-full bg-white px-4 sm:w-auto"
              >
                Reset
              </Button>
            </div>
            <Button
              type="submit"
              form="complete-account-form"
              disabled={isCompleting}
              className="h-11 w-full bg-zinc-950 px-6 text-white hover:bg-zinc-800 sm:w-auto"
            >
              {isCompleting && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {isCompleting ? "Saving..." : "Complete profile"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </section>
  );
}
