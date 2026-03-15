import { AuthenticateInstructor } from "@/app/actions/InstructorActions";
import { instructorLoginPage } from "@/constants";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await AuthenticateInstructor();

    if (!user) {
        redirect(instructorLoginPage);
    }

    return <>{children}</>;
}
