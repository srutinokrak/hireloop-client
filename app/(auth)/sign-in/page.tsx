'use client'
import { AuthForm } from '@/components/auth-form';
import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
type AuthformData = {
  name: string
  email: string
  password: string
}

const SignInPage = () => {

    const searchParams = useSearchParams()
    const redirectTo = searchParams.get("redirectTo") ?? "/"

    console.log('redirectTo',redirectTo);
    const handleSignin = async (data:AuthformData) =>{
      const { data:SignInResponse, error } = await authClient.signIn.email({
    email: data.email, 
    password: data.password, 
    rememberMe:true,
    callbackURL: redirectTo, // An optional URL to redirect to after the user signs in. (optional)
});
console.log('suign in response',SignInResponse,error);
    if (error) throw error; // sends the message to the form to show it
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4 py-16">
            <AuthForm mode="signin" onSubmit={handleSignin}/>
        </main>
    );
};

export default SignInPage;
