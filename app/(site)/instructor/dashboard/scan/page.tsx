import { QRScanner } from "../../../../components/ScannerComponent";
import { Suspense } from "react";
import { isValidObjectId } from "mongoose";
import { PopulatedPlainScheduleDocument } from "@/app/mongoDb/models/schedule";
import { ProcessInstructorSchedule } from "@/app/actions/ScheduleActions";
import Loading from "@/app/(site)/loading";
import {
    ChevronLeft,
    CircleAlert,
    CircleCheckBig,
    DoorOpen,
    User,
} from "lucide-react";
import clsx from "clsx";
import { instructorScanPage } from "@/constants";
import Link from "next/link";
import { PopulatedPlainRoomDocument, Room } from "@/app/mongoDb/models/room";
import { connectDB } from "@/app/mongoDb/mongodb";

function ScheduleCard({
    schedule,
}: {
    schedule: PopulatedPlainScheduleDocument;
}) {
    const startMeridiem: "AM" | "PM" =
        schedule.slot.start.hour < 12 ? "AM" : "PM";
    const startHour =
        schedule.slot.start.hour % 12 === 0
            ? 12
            : schedule.slot.start.hour % 12;
    const startMinute = schedule.slot.start.minute;
    const endMeridiem: "AM" | "PM" =
        schedule.slot.start.hour < 12 ? "AM" : "PM";
    const endHour =
        schedule.slot.end.hour % 12 === 0 ? 12 : schedule.slot.end.hour % 12;
    const endMinute = schedule.slot.end.minute;

    return (
        <>
            <div className="bg-green-secondary font-dm-sans text-text-primary mt-4 rounded-lg border border-white/10 p-4 font-semibold">
                <p className="text-yellow-primary">{schedule.subject}</p>
                <p className="font-roboto-mono text-2xl">
                    {startHour}:{startMinute === 0 && "0"}
                    {startMinute}
                    {startMeridiem} - {endHour}:{endMinute === 0 && "0"}
                    {endMinute}
                    {endMeridiem}
                </p>
                <p className="text-text-primary/80 flex items-center gap-2">
                    <span>
                        <User size={15} />
                    </span>
                    {schedule.instructor.fullName}
                </p>
            </div>
        </>
    );
}

async function Process({ roomid }: { roomid: string }) {
    let classroom: PopulatedPlainRoomDocument | null = null;
    try {
        await connectDB();
        classroom = await Room.findById(roomid).populate("building").lean();
    } catch (e) {
        console.error(e);
    }
    const { status, statusMessage, message, schedule } =
        await ProcessInstructorSchedule(roomid);

    return (
        <div className="">
            {classroom && (
                <div className="text-text-primary bg-green-secondary mt-2 flex items-center gap-3 rounded-lg border border-white/10 p-3">
                    <span className="rounded-md border border-white/10 bg-green-200/10 p-3 text-white">
                        <DoorOpen size={25} />
                    </span>
                    <div>
                        <p className="text-text-secondary/90">
                            {classroom.building.name}
                        </p>
                        <p className="text-2xl font-semibold">
                            {classroom.code}
                        </p>
                    </div>
                </div>
            )}
            {schedule && <ScheduleCard schedule={schedule} />}
            <div
                className={clsx(
                    "text-text-primary font-dm-sans m-auto my-4 flex items-center gap-3 rounded-lg border p-4 text-sm font-semibold",
                    status === "success"
                        ? "border-green-400/30 bg-green-400/20"
                        : "border-red-400/30 bg-red-400/20",
                )}
            >
                <span
                    className={clsx(
                        "rounded-xl p-3",
                        status === "success"
                            ? "border-green-400/30 bg-green-400/20 text-green-400"
                            : "border-red-400/30 bg-red-400/20 text-red-400",
                    )}
                >
                    {status === "success" ? (
                        <CircleCheckBig />
                    ) : (
                        <CircleAlert />
                    )}
                </span>
                <div>
                    <p
                        className={clsx(
                            "text-xl",
                            status == "success"
                                ? "text-green-400"
                                : "text-red-400",
                        )}
                    >
                        {statusMessage}
                    </p>
                    <p className="text-sm font-normal opacity-70">{message}</p>
                </div>
            </div>
            <Link
                href={instructorScanPage}
                className="text-text-primary border-text-primary/50 focus-visible:bg-green-secondary mx-auto mt-6 flex items-center justify-center gap-1 rounded-md border px-4 py-2 font-semibold"
            >
                <span>
                    <ChevronLeft />
                </span>
                Back To Scanner
            </Link>
        </div>
    );
}

async function Suspended({
    searchParams,
}: {
    searchParams: Promise<{ roomid?: string }>;
}) {
    const { roomid } = await searchParams;

    return !roomid || !isValidObjectId(roomid) ? (
        <QRScanner scanUrl={instructorScanPage} />
    ) : (
        <Process roomid={roomid} />
    );
}

export default function Page({
    searchParams,
}: {
    searchParams: Promise<{ roomid?: string }>;
}) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Suspended searchParams={searchParams} />
            </Suspense>
        </>
    );
}
