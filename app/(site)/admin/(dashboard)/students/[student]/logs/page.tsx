import Loading from "@/app/(site)/loading";
import { BackButton } from "@/app/components/BackButton";
import ErrorFallback from "@/app/components/ErrorFallback";
import {
    AttendanceLog,
    PopulatePlainLogDocument,
} from "@/app/mongoDb/models/log";
import { PlainUserDocument, User } from "@/app/mongoDb/models/user";
import { connectDB } from "@/app/mongoDb/mongodb";
import { adminStudentsPage } from "@/constants";
import { History, LogsIcon } from "lucide-react";
import { Suspense } from "react";

async function Logs({ studentId }: { studentId: string }) {
    let logs: PopulatePlainLogDocument[];
    let student: PlainUserDocument;
    try {
        await connectDB();
        student = await User.findById(studentId).lean({ virtuals: true });

        logs = await AttendanceLog.find({ user: student?._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "schedule",
                populate: { path: "room", populate: "building" },
            })
            .lean();
    } catch (e) {
        console.error(e);
        return <ErrorFallback error={e} />;
    }
    return (
        <>
            <p className="text-text-primary mt-5 mb-10 flex items-center gap-2 text-2xl font-semibold">
                <span>
                    <History size={30} />
                </span>
                {student.lastName.split(" ")[0]}'
                {student.lastName.charAt(-1) !== "s" && "s"} Logs
            </p>
            {logs.map((log) => {
                const date = log.createdAt.toLocaleDateString("en-PH", {
                    timeZone: "Asia/Manila",
                });
                const time = log.createdAt.toLocaleTimeString("en-PH", {
                    timeZone: "Asia/Manila",
                });
                return (
                    <div
                        key={log._id.toString()}
                        className="bg-green-secondary text-text-primary border-green-tertiary relative my-3 grow rounded-md border-2 px-5 py-3 shadow-md"
                    >
                        <p>
                            Subject:{" "}
                            <span className="text-yellow-primary">
                                {log.schedule.subject}
                            </span>
                        </p>
                        <p>
                            Venue:{" "}
                            <span className="text-yellow-primary">
                                Venue: {log.schedule.room.building.name} -{" "}
                                {log.schedule.room.code}
                            </span>
                        </p>
                        <p>
                            Date:{" "}
                            <span className="text-yellow-primary">{date}</span>
                        </p>
                        <p>
                            Time:{" "}
                            <span className="text-yellow-primary">{time}</span>
                        </p>
                        <div className="absolute inset-y-0 left-0 flex -translate-x-1/2 flex-col justify-evenly">
                            <div className="bg-green-tertiary h-2 w-5 rounded-full" />
                            <div className="bg-green-tertiary h-2 w-5 rounded-full" />
                        </div>
                        <span className="absolute inset-y-0 right-3 flex items-center">
                            <History size={30} />
                        </span>
                    </div>
                );
            })}
        </>
    );
}

export default async function Page({
    params,
}: {
    params: Promise<{ student: string }>;
}) {
    const { student } = await params;

    return (
        <>
            <BackButton dest={`${adminStudentsPage}/${student}`} />
            <Suspense fallback={<Loading />}>
                <Logs studentId={student} />
            </Suspense>
        </>
    );
}
