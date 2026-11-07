import { AuthForm } from '@/components/auth-form';

const SignInPage = () => {
    

    return (
        <main className="flex min-h-svh items-center justify-center px-4 py-16">
            <AuthForm mode="signin" onSubmit={handleSignin}/>
        </main>
    );
};

export default SignInPage;
