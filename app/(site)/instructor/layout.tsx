import { AuthenticateInstructor } from "@/app/actions/InstructorActions";
import { AuthProvider } from "@/app/contexts/AuthProvider";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const initialUser = await AuthenticateInstructor();

    return (
        <AuthProvider
            authAction={AuthenticateInstructor}
            initialUser={initialUser}
        >
            {children}
        </AuthProvider>
    );
}
