import Loading from "@/app/(site)/loading";
import { BackButton } from "@/app/components/BackButton";
import ErrorFallback from "@/app/components/ErrorFallback";
import {
    AttendanceLog,
    PopulatePlainLogDocument,
} from "@/app/mongoDb/models/log";
import { PlainUserDocument, User } from "@/app/mongoDb/models/user";
import { connectDB } from "@/app/mongoDb/mongodb";
import { adminInstructorsPage } from "@/constants";
import { History, LogsIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Logs({ instructorId }: { instructorId: string }) {
    let logs: PopulatePlainLogDocument[];
    let instructor: PlainUserDocument;
    try {
        await connectDB();
        instructor = await User.findById(instructorId).lean({ virtuals: true });

        logs = await AttendanceLog.find({ user: instructor?._id })
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
                {instructor.lastName}'
                {instructor.lastName.charAt(-1) !== "s" && "s"} Logs
            </p>
            {logs.length <= 0 ? (
                <div className="text-text-primary bg-green-secondary/20 mt-10 rounded-md p-10 text-center text-xl font-semibold shadow-md">
                    Empty
                </div>
            ) : (
                logs.map((log) => {
                    const date = log.createdAt.toLocaleDateString("en-PH", {
                        timeZone: "Asia/Manila",
                    });
                    const day = log.createdAt.toLocaleDateString("en-PH", {
                        weekday: "long",
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
                                    {log.schedule.room.building.name} -{" "}
                                    {log.schedule.room.code}
                                </span>
                            </p>
                            <p>
                                Date:{" "}
                                <span className="text-yellow-primary">
                                    {date} - {day}
                                </span>
                            </p>
                            <p>
                                Time:{" "}
                                <span className="text-yellow-primary">
                                    {time}
                                </span>
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
                })
            )}
        </>
    );
}

export default async function Page({
    params,
}: {
    params: Promise<{ instructor: string }>;
}) {
    const { instructor } = await params;

    return (
        <>
            <BackButton dest={`${adminInstructorsPage}/${instructor}`} />
            <Suspense fallback={<Loading />}>
                <Logs instructorId={instructor} />
            </Suspense>
        </>
    );
}
