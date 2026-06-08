"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useSession } from "@/lib/auth-client";

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
import Link from "next/link";
import { loginUserAction } from "@/actions/user.action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  Dumbbell,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const formSchema = z.object({

  email: z.email().min(1, "Enter your email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),

});

export default function SigninPage() {
  const [isSigningin, setIsSigningin] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.data?.user) {
      router.push("/");
    }
  }, [session, router]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (session?.isPending) {
    return <div>Loading...</div>;
  };

  if (session?.data?.user) {
    return null;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSigningin(true);

    const rawData = {
      password: data.password,
      email: data.email,
    };

    const res = await loginUserAction(rawData);
    console.log(res);

    if (!res) {
      setIsSigningin(false);
      form.reset();
      router.push("/complete-account");
      router.refresh();
      return;
    };

    if ("error" in res) {
      setIsSigningin(false);

      toast("Failed to log in.", {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      return;
    };

    toast("Login successfully.", {
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    setIsSigningin(false);
    form.reset();
    router.push("/");
    router.refresh();
  }

  return (
    <section className="grid w-full max-w-5xl items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div className="flex flex-col gap-5 lg:gap-8">
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
              Welcome back to your training schedule.
            </h1>
            <p className="mt-3 max-w-md text-base leading-7 text-zinc-600">
              Sign in to reserve gym sessions, manage your profile, and keep
              your next workout ready.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-center gap-3 rounded-xl border border-amber-200/70 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Quick reservations</p>
              <p className="text-sm text-zinc-600">
                Pick available time slots from any device.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Secure access</p>
              <p className="text-sm text-zinc-600">
                Your account keeps bookings and details in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full border-amber-100/80 bg-white/95 shadow-2xl shadow-amber-950/10 backdrop-blur sm:max-w-xl lg:justify-self-end">
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
              <LockKeyhole className="size-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                Sign in
              </CardTitle>
              <CardDescription className="mt-1 max-w-md text-pretty text-zinc-600">
                Access your booking dashboard and continue planning your
                workouts.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-7">
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-email">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id="form-rhf-input-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="name@example.com"
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-password">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <LockKeyhole
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id="form-rhf-input-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        type="password"
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
                disabled={isSigningin}
                className="h-11 w-full bg-white px-4 sm:w-auto"
              >
                Reset
              </Button>
            </div>
            <Button
              type="submit"
              form="form-rhf-input"
              disabled={isSigningin}
              className="h-11 w-full bg-zinc-950 px-6 text-white hover:bg-zinc-800 sm:w-auto"
            >
              {isSigningin && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {isSigningin ? "Signing in..." : "Sign in"}
            </Button>
          </Field>
        </CardFooter>
        <div className="border-t border-amber-100/80 px-5 py-4 text-center text-sm text-zinc-600 sm:px-7">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  )
}
