import { AuthenticateAdmin } from "@/app/actions/AdminAuthActions";
import { adminLoginPage } from "@/constants";
import { redirect } from "next/navigation";
import { AdminNavBar } from "./SmallComponents";
import { Suspense } from "react";
import Loading from "../../loading";

async function Authenticate({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await AuthenticateAdmin();

    if (!user) {
        redirect(adminLoginPage);
    }

    return (
        <>
            <AdminNavBar />
            <main className="font-inter m-auto max-w-5xl p-3 px-5">
                {children}
            </main>
        </>
    );
}

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<Loading />}>
            <Authenticate>{children}</Authenticate>
        </Suspense>
    );
}
