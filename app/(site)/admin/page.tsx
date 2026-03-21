import { AuthenticateAdmin } from "@/app/actions/AdminAuthActions";
import LoginForm from "@/app/components/LoginForm";
import { adminDashboardPage } from "@/constants";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
    const user = await AuthenticateAdmin();
    if (user) {
        redirect(adminDashboardPage);
    }

    return (
        <section className="flex h-svh flex-col items-center justify-center bg-white sm:bg-transparent">
            <LoginForm formType="admin" />
        </section>
    );
}
