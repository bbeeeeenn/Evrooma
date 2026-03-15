import { AuthenticateAdmin } from "@/app/actions/AdminActions";
import { adminLoginPage } from "@/constants";
import { redirect } from "next/navigation";
import { AdminNavBar } from "./AdminNavBar";

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await AuthenticateAdmin();

    if (!user) {
        redirect(adminLoginPage);
    }

    return (
        <>
            <AdminNavBar />
            {children}
        </>
    );
}
