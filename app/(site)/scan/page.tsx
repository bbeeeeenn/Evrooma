import { Divider } from "@/app/components/Divider";
import { PopulatedPlainRoomDocument, Room } from "@/app/mongoDb/models/room";
import { connectDB } from "@/app/mongoDb/mongodb";
import { homePage, instructorScanPage, studentScanPage } from "@/constants";
import { BookText, Building2, GraduationCap } from "lucide-react";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Suspended({
    searchParams,
}: {
    searchParams: Promise<{ roomid?: string }>;
}) {
    const { roomid } = await searchParams;
    if (!roomid || !isValidObjectId(roomid)) {
        redirect(homePage);
    }
    let classroom: PopulatedPlainRoomDocument;
    try {
        await connectDB();
        classroom = await Room.findById(roomid).populate("building").lean();
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
                    href={`${studentScanPage}?roomid=${encodeURIComponent(roomid)}`}
                    className="bg-yellow-primary flex items-center justify-center gap-2 rounded-md p-3 font-semibold shadow-md"
                >
                    <span>
                        <GraduationCap />
                    </span>
                    Student
                </Link>
                <Link
                    href={`${instructorScanPage}?roomid=${encodeURIComponent(roomid)}`}
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
    searchParams: Promise<{ roomid?: string }>;
}) {
    return (
        <Suspense>
            <Suspended searchParams={searchParams} />
        </Suspense>
    );
}
