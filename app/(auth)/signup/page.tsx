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
import { createNewUserAction } from "@/actions/user.action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  Dumbbell,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const formSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Use only letters, numbers, and underscores."
    ),
  email: z.email().min(1, "Enter your email address."),
  phone: z.string().min(10, "Phone number must be at least 10 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rePassword: z.string().min(8, "Repeat your password."),
});

export default function SignupPage() {
  const [isSignup, setIsSignup] = useState(false);
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
      userName: "",
      email: "",
      password: "",
      phone: "",
      rePassword: "",
    },
  });

  if (session?.isPending) {
    return <div>Loading...</div>;
  };

  if (session?.data?.user) {
    return null;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSignup(true);
    if (data.password !== data.rePassword) {
      setIsSignup(false);
      return toast("Passwords do not match.", {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    }

    const rawData = {
      name: data.userName,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };

    const res = await createNewUserAction(rawData);

    if ("error" in res) {
      toast.error(res.error, {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      setIsSignup(false);
      form.reset();
      router.push("/signin");
      return;
    }

    toast("Account created successfully.", {
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    setIsSignup(false);
    form.reset();
    router.push("/");
    router.refresh();
  }

  return (
    <section className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden flex-col gap-8 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-lg shadow-amber-900/10 sm:size-14">
            <Dumbbell className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-700">Gym Booking</p>
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-950">
              Book your workouts without waiting around.
            </h1>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-amber-200/70 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Fast booking</p>
              <p className="text-sm text-zinc-600">
                Choose available time slots and trainers from your phone.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-zinc-950">Secure profile</p>
              <p className="text-sm text-zinc-600">
                Keep your details ready for every future reservation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full border-amber-100/80 bg-white/90 shadow-2xl shadow-amber-950/10 backdrop-blur sm:max-w-2xl lg:justify-self-end">
        <CardHeader className="gap-3 px-5 pt-5 sm:px-7 sm:pt-7">
          <Link
            href="/"
            className="mb-1 flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white lg:hidden">
              <Dumbbell className="size-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                Create an account
              </CardTitle>
              <CardDescription className="mt-1 max-w-md text-pretty text-zinc-600">
                Save your details and start booking workout sessions at the
                gym.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 sm:px-7">
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4 sm:grid sm:grid-cols-2">
              <Controller
                name="userName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="ivan_fit"
                      autoComplete="username"
                      className="h-11 bg-white"
                    />
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
                    <FieldLabel htmlFor="form-rhf-input-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="ivan@example.com"
                      autoComplete="email"
                      type="email"
                      className="h-11 bg-white"
                    />
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-phone">
                      Phone number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="0888 888 888"
                      autoComplete="tel"
                      className="h-11 bg-white"
                    />
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
                    <Input
                      {...field}
                      id="form-rhf-input-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      type="password"
                      className="h-11 bg-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="sm:col-span-2"
                  >
                    <FieldLabel htmlFor="form-rhf-input-rePassword">
                      Repeat password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-rePassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password again"
                      autoComplete="new-password"
                      type="password"
                      className="h-11 bg-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="border-amber-100/80 bg-amber-50/60 p-5 sm:p-7">
          <Field className="gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                disabled={isSignup}
                className="h-11 w-full bg-white px-4 sm:w-auto"
              >
                Reset
              </Button>
            </div>
            <Button
              type="submit"
              form="form-rhf-input"
              disabled={isSignup}
              className="h-11 w-full bg-zinc-950 px-6 text-white hover:bg-zinc-800 sm:w-auto"
            >
              {isSignup && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {isSignup ? "Creating..." : "Create account"}
            </Button>
          </Field>
        </CardFooter>
        <div className="border-t border-amber-100/80 px-5 py-4 text-center text-sm text-zinc-600 sm:px-7">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </section>
  )
}
