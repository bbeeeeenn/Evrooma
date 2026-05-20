import clsx from "clsx";
import { GraduationCap } from "lucide-react";
import { adminStudentsPage } from "@/constants";
import Link from "next/link";
import { Suspense } from "react";
import { User, PlainUserDocument } from "@/app/mongoDb/models/user";
import { connectDB } from "@/app/mongoDb/mongodb";
import { connection } from "next/server";
import { UserListSkeleton } from "@/app/(site)/Components";

async function StudentsList() {
    let students: PlainUserDocument[] = [];
    try {
        await connection();
        await connectDB();
        students = await User.find({ type: "student" }).lean({
            virtuals: true,
        });
    } catch (e) {
        console.error(e);
        return null;
    }

    return (
        <ul className="space-y-4">
            {students.map((student) => (
                <li key={student._id.toString()}>
                    <Link
                        href={`${adminStudentsPage}/${student._id}`}
                        className={clsx(
                            "bg-green-secondary flex w-full items-center gap-2 rounded-md p-4 text-green-50 shadow-md transition-all",
                            "hover:scale-x-101 hover:brightness-120 focus-visible:scale-x-101 focus-visible:brightness-120 active:scale-100",
                        )}
                    >
                        <span className="rounded-lg border border-white/10 bg-white/5 p-2">
                            <GraduationCap size={30} />
                        </span>
                        <div>
                            <p className="flex items-center gap-2 text-xl font-bold">
                                {student.fullName}
                            </p>
                            <p className="text-text-secondary truncate text-sm font-semibold">
                                {student.email}
                            </p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default function AccountsPage() {
    return (
        <>
            <h1 className="mt-6 mb-8 text-2xl font-bold text-green-100">
                Students
            </h1>
            <Suspense fallback={<UserListSkeleton />}>
                <StudentsList />
            </Suspense>
        </>
    );
}
