import { Divider } from "@/app/components/Divider";
import { PopulatedPlainRoomDocument, Room } from "@/app/mongoDb/models/room";
import {
    PlainScheduleDocument,
    PopulatedPlainScheduleDocument,
    Schedule,
} from "@/app/mongoDb/models/schedule";
import { connectDB } from "@/app/mongoDb/mongodb";
import { homePage, instructorScanPage } from "@/constants";
import { BookText, Building2, DoorOpen, GraduationCap } from "lucide-react";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Suspened({
    searchParams,
}: {
    searchParams: Promise<{ roomId?: string }>;
}) {
    const { roomId } = await searchParams;
    if (!roomId || !isValidObjectId(roomId)) {
        redirect(homePage);
    }
    let classroom: PopulatedPlainRoomDocument;
    try {
        await connectDB();
        classroom = await Room.findById(roomId).populate("building").lean();
        if (!classroom) redirect(homePage);
    } catch (e) {
        console.error(e);
        return (
            <div className="text-text-primary font-semibold">
                {e instanceof Error ? e.message : "Unknown Error."}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 m-auto h-fit max-w-xs">
            <p className="font-poppins text-text-primary text-md mb-1.5 flex items-center justify-center gap-1 font-semibold tracking-wider">
                <span>
                    <Building2 size={15} />
                </span>
                {classroom.building.name}
            </p>
            <p className="text-text-primary bg-green-secondary rounded-md py-5 text-center text-4xl font-bold tracking-wider shadow-md">
                {classroom.code}
            </p>
            <Divider text="Continue as" />
            <div className="space-y-6">
                <Link
                    href={""}
                    className="bg-yellow-primary flex items-center justify-center gap-2 rounded-md p-3 font-semibold shadow-md"
                >
                    <span>
                        <GraduationCap />
                    </span>
                    Student
                </Link>
                <Link
                    href={`${instructorScanPage}?roomId=${encodeURIComponent(roomId)}`}
                    className="bg-yellow-primary flex items-center justify-center gap-2 rounded-md p-3 font-semibold shadow-md"
                >
                    <span>
                        <BookText />
                    </span>
                    Instructor
                </Link>
            </div>
        </div>
    );
}

export default async function ScanLandingPage({
    searchParams,
}: {
    searchParams: Promise<{ roomId?: string }>;
}) {
    return (
        <Suspense>
            <Suspened searchParams={searchParams} />
        </Suspense>
    );
}
