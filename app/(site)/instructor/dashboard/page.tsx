import { GetInstructorInfo } from "@/app/actions/InstructorAuthActions";
import { instructorLoginPage } from "@/constants";
import { BookText } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Profile() {
    const instructor = await GetInstructorInfo();
    if (!instructor) redirect(instructorLoginPage);

    return (
        <div className="flex items-center gap-2">
            <BookText size={45} />
            <div>
                <p className="font-semibold">Welcome,</p>
                <p className="text-2xl font-bold">{instructor.fullName}</p>
            </div>
        </div>
    );
}

export default function InstructorPage() {
    return (
        <Suspense>
            <Profile />
        </Suspense>
    );
}
