import { GetInstructorAuthInfo } from "@/app/actions/InstructorAuthActions";
import { instructorLoginPage } from "@/constants";
import { redirect } from "next/navigation";
import { InstructorNavBar } from "./ClientComponents";
import { Suspense } from "react";
import { headers } from "next/headers";
import Loading from "../../loading";

async function Authenticate({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const instructor = await GetInstructorAuthInfo();

    if (!instructor) {
        const pathname = (await headers()).get("x-pathname") ?? "";
        redirect(
            `${instructorLoginPage}?redirect=${encodeURIComponent(pathname)}`,
        );
    }

    return (
        <>
            <InstructorNavBar />
            <main className="font-inter m-auto max-w-5xl px-5 pt-3 pb-40">
                {children}
            </main>
        </>
    );
}

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<Loading />}>
            <Authenticate>{children}</Authenticate>
        </Suspense>
    );
}
