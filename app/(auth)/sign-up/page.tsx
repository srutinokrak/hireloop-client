"use client"
import { AuthForm } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"


type AuthformData = {
  name: string
  email: string
  password: string
}

const SignUpPage = () => {
  const handleSignup = async (data:AuthformData) => {
    const { data:signupResponse, error } = await authClient.signUp.email({
      name: data.name, // required, The name of the user.
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    })
    console.log("Signup response:", signupResponse,error)
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-16">
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </main>
  )
}

export default SignUpPage
