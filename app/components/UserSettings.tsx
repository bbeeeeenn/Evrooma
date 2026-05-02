import { GetInstructorAuthInfo } from "@/app/actions/InstructorAuthActions";
import ErrorFallback from "@/app/components/ErrorFallback";
import { GetStudentAuthInfo } from "@/app/actions/StudentAuthActions";
import { Cog, Mail } from "lucide-react";
import { Divider } from "@/app/components/Divider";
import { ChangeName, ChangePassword } from "./UserSettingsComponents";

export async function UserSettings({
    userType,
}: {
    userType: "instructor" | "student";
}) {
    const instructor =
        userType === "instructor"
            ? await GetInstructorAuthInfo()
            : await GetStudentAuthInfo();
    if (!instructor) return <ErrorFallback error={null} />;

    return (
        <>
            <h1 className="text-text-primary mt-3 flex items-center gap-2 text-3xl font-semibold">
                <span>
                    <Cog size={40} />
                </span>
                Settings
            </h1>
            <Divider text="Profile" />
            <div className="text-text-primary my-7 flex flex-wrap items-center gap-3 text-xl font-semibold">
                <span>
                    <Mail />
                </span>
                <p className="truncate">{instructor.email}</p>
            </div>
            <ChangeName
                userType={instructor.type}
                oldName={instructor.firstName}
                type="fname"
            />
            <ChangeName
                userType={instructor.type}
                oldName={instructor.lastName}
                type="lname"
            />
            <Divider text="Password" />
            <ChangePassword userType={instructor.type} />
        </>
    );
}
