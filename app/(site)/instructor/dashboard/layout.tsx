import { AuthenticateInstructor } from "@/app/actions/InstructorAuthActions";
import { instructorLoginPage } from "@/constants";
import { redirect } from "next/navigation";
import { InstructorNavBar } from "./NavBar";

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await AuthenticateInstructor();

    if (!user) {
        redirect(instructorLoginPage);
    }

    return (
        <>
            <InstructorNavBar />
            <main className="font-inter m-auto max-w-5xl p-3 px-5">
                {children}
            </main>
        </>
    );
}
