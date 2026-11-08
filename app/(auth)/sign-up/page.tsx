"use client"
import { useState } from "react"
import { AuthForm } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type AuthformData = {
  name: string
  email: string
  password: string
  role?: "seeker" | "recruiter" | "admin"
}

const SignUpPage = () => {
  const router = useRouter()
  const [errorMessage, setError] = useState("")
  const handleSignup = async (data: AuthformData) => {
    const { data: signupResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      callbackURL: "/",
    })
    console.log("Signup response:", signupResponse, error)
    if (error) {
      setError(error.message || "An error occurred during signup.")
      return
    }
    router.refresh() // refresh the page to update the session
    router.push("/")
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-16">
      {errorMessage && (
        <p role="alert" className="mb-4 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </main>
  )
}

export default SignUpPage
