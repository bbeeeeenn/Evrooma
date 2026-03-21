import InstructorLogout from "./_";
import Loading from "../../loading";
import { redirect } from "next/navigation";
import { instructorLoginPage } from "@/constants";
import {
    AuthenticateInstructor,
    LogoutInstructor,
} from "@/app/actions/InstructorAuthActions";

export default async function AdminLogoutPage() {
    if (!(await AuthenticateInstructor())) {
        redirect(instructorLoginPage);
    }

    return (
        <div className="fixed inset-0 m-auto flex size-fit items-center gap-2 text-3xl font-bold">
            <InstructorLogout action={LogoutInstructor} />
            <Loading />
        </div>
    );
}
