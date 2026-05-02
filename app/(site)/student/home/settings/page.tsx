import { Suspense } from "react";
import Loading from "@/app/(site)/loading";
import { UserSettings } from "@/app/components/UserSettings";

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <UserSettings userType="student" />
        </Suspense>
    );
}
