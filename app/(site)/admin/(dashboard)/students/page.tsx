import clsx from "clsx";
import { GraduationCap } from "lucide-react";
import { adminStudentsPage } from "@/constants";
import Link from "next/link";
import { Suspense } from "react";
import { User, PlainUserDocument } from "@/app/mongoDb/models/user";
import { connectDB } from "@/app/mongoDb/mongodb";
import { connection } from "next/server";

function UserListSkeleton() {
    return (
        <ul className="space-y-4 opacity-50">
            {Array.from({ length: 3 }).map((_, i) => (
                <li
                    key={i}
                    className="bg-green-secondary border-green-tertiary/30 block w-full space-y-2 rounded-md border-b-4 px-5 py-5 shadow-md"
                >
                    <div className="h-8 max-w-2xs animate-pulse bg-white/30"></div>
                    <div className="h-5 max-w-xs animate-pulse bg-white/30"></div>
                </li>
            ))}
        </ul>
    );
}

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
                            "bg-green-secondary block w-full rounded-md px-5 py-5 text-green-50 shadow-md transition-all",
                            "hover:bg-green-tertiary active:bg-green-tertiary hover:scale-101 active:scale-100",
                        )}
                    >
                        <p className="flex items-center gap-2 text-2xl font-bold">
                            <span>
                                <GraduationCap />
                            </span>
                            {student.fullName}
                        </p>
                        <p className="truncate font-semibold">
                            {student.email}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default function AccountsPage() {
    return (
        <>
            <h1 className="mt-6 mb-8 text-4xl font-bold text-green-100">
                Students
            </h1>
            <Suspense fallback={<UserListSkeleton />}>
                <StudentsList />
            </Suspense>
        </>
    );
}
