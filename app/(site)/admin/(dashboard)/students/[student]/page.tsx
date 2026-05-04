import { adminStudentsPage, DaysOfWeek } from "@/constants";
import { BackButton } from "@/app/components/BackButton";
import { StudentInfoComponent } from "./ClientComponents";

export default async function InstructorInfoPage() {
    return (
        <>
            <BackButton dest={adminStudentsPage} />
            <StudentInfoComponent />
        </>
    );
}
