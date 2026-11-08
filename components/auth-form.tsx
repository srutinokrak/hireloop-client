"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, LockIcon, MailIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// The two modes of this form.
const modes = [
  { key: "signin", label: "Sign In", href: "/sign-in" },
  { key: "signup", label: "Sign Up", href: "/sign-up" },
] as const

type Mode = (typeof modes)[number]["key"]

// Everything the form collects and hands to the page (name only on sign up,
// role is "seeker" | "recruiter" | "admin", stays "seeker" on sign in).
export type AuthFormData = {
  name: string
  email: string
  password: string
  role: "seeker" | "recruiter" | "admin"
}

// The pick-a-role pills shown on Sign Up.
const roleOptions = [
  { value: "seeker", label: "Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const

// Shared styles for the inputs.
const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#111112] py-2.5 pr-3 pl-10 text-sm text-foreground outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

const iconClass =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"

export function AuthForm({
  mode,
  onSubmit,
}: {
  mode: Mode
  onSubmit?: (data: AuthFormData) => Promise<void | { error?: { message?: string | null } }>
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // 1. Collect every input inside the form by its name.
  function collectFormData(form: HTMLFormElement): AuthFormData {
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>

    return {
      name: values.name ?? "",
      email: values.email,
      password: values.password,
      role: (values.role ?? "seeker") as AuthFormData["role"], // picked on sign up, "seeker" on sign in
    }
  }

  // 2. Hand the data to the page (which sends it to better-auth).
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // stop the browser refresh

    setLoading(true)
    setError(null)

    const data = collectFormData(event.currentTarget)
    console.log("Form data:", data)

    try {
      const result = await onSubmit?.(data)
      // Pages return better-auth's { data, error }, show the error if there is one.
      if (result?.error?.message) {
        setError(result.error.message)
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong, please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161616]/90 p-6 shadow-2xl backdrop-blur-sm">
      {/* Toggle between Sign In / Sign Up */}
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#111112] p-1">
        {modes.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={mode === tab.key ? "page" : undefined}
            className={cn(
              "rounded-lg py-2 text-center text-sm transition-colors",
              mode === tab.key
                ? "bg-primary font-medium text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* The form itself */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {mode === "signup" && (
          <div className="relative">
            <UserIcon className={iconClass} aria-hidden />
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Full name"
              className={inputClass}
            />
          </div>
        )}

        <div className="relative">
          <MailIcon className={iconClass} aria-hidden />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email address"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <LockIcon className={iconClass} aria-hidden />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            placeholder="Password"
            className={cn(inputClass, "pr-10")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        </div>

        {/* Pick a role (Sign Up only) — hidden radio buttons styled as pills */}
        {mode === "signup" && (
          <div>
            <p className="mb-2 text-sm text-muted-foreground">I am a:</p>
            <div className="flex gap-1 rounded-xl bg-[#111112] p-1">
              {roleOptions.map((role) => (
                <label key={role.value} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    defaultChecked={role.value === "seeker"}
                    className="peer sr-only"
                  />
                  <span className="block rounded-lg py-2 text-center text-sm text-muted-foreground transition-colors peer-checked:bg-primary peer-checked:font-medium peer-checked:text-primary-foreground">
                    {role.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full rounded-xl">
          {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
        </Button>

        {/* Server error message (e.g. "email is already taken") */}
        {error && <p className="text-xs text-destructive">{error}</p>}

        {/* Switch link below the button */}
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              New to HireLoop?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign In
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  )
}
