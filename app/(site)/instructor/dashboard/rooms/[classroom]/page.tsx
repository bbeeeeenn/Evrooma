import { BackButton } from "@/app/components/BackButton";
import { instructorRoomsPage } from "@/constants";
import { ClassroomHeader } from "./ClientComponents";
import { Suspense } from "react";
import { connectDB } from "@/app/mongoDb/mongodb";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import Loading from "@/app/(site)/loading";
import { PopulatedPlainRoomDocument, Room } from "@/app/mongoDb/models/room";

async function ClassroomPage({
    params,
}: {
    params: Promise<{ classroom: string }>;
}) {
    const roomId = (await params).classroom;
    if (!isValidObjectId(roomId)) redirect(instructorRoomsPage);
    let classroom: PopulatedPlainRoomDocument;

    try {
        await connectDB();
        classroom = await Room.findById(roomId).populate("building").lean();
    } catch (e) {
        console.error(e);
        return (
            <div className="text-text-primary font-semibold">
                {e instanceof Error ? e.message : "Unexpected Error."}
            </div>
        );
    }

    if (!classroom) {
        redirect(instructorRoomsPage);
    }

    return (
        <ClassroomHeader
            buildingName={classroom.building.name}
            classroomCode={classroom.code}
        />
    );
}

export default function Page({
    params,
}: {
    params: Promise<{ classroom: string }>;
}) {
    return (
        <>
            <BackButton dest={instructorRoomsPage} />
            <Suspense fallback={<Loading />}>
                <ClassroomPage params={params} />
            </Suspense>
        </>
    );
}
