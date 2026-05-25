"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters.").max(10, "Username must be at most 10 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  email: z.email().min(1, "Please enter your email."),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  password: z.string().min(8, "Password bust be at least 8 characters."),
  rePassword: z.string().min(8, "Repeat your password.")
})

export default function SignupPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      phone: "",
      rePassword: ""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSignup(true);
    if (data.password !== data.rePassword) {
      setIsSignup(false);
      return toast("Passwords do not match!", {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    };

    const rawData = {
      name: data.userName,
      email: data.email,
      password: data.password,
      phone: data.phone
    }

    const res = await createNewUserAction(rawData);

    if ("error" in res) {
      setIsSignup(false);
      toast.error(res.error, {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      return;
    }

    toast("Account created successfully!", {
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                    placeholder="Jhon"
                    autoComplete="username"
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
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="user@email.com"
                    autoComplete="email"
                    type="email"
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
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Phone number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="0888 888 888"
                    autoComplete="phone"
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
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="password"
                    type="password"
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Re-enter Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-rePassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Repeat Password"
                    autoComplete="rePassword"
                    type="password"
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
      <CardFooter>
        <Field orientation="horizontal" className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button type="submit" form="form-rhf-input" disabled={isSignup}>
              {isSignup ? "Loading..." :"Signup"}
            </Button>
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSignup}>
              Reset
            </Button>
          </div>
          <Button variant="destructive" disabled={isSignup}>
            <Link href="/">
              Cancel
            </Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
