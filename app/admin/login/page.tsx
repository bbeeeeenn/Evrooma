import { AdminAuth } from "@/app/actions/AdminAuth";
import AdminLoginForm from "./LoginForm";

export default function Page() {
    return (
        <section className="flex h-svh flex-col items-center justify-center bg-white sm:bg-transparent">
            <AdminLoginForm action={AdminAuth} />
        </section>
    );
}
