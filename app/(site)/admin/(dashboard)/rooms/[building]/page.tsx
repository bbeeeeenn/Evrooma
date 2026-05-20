import { adminRoomsPage } from "@/constants";
import {
    AddClassroomComponent,
    BuildingNameHeader,
    BuildingSettings,
} from "./ClientComponents";
import { Divider } from "@/app/components/Divider";
import { Suspense } from "react";
import Link from "next/link";
import { PopulatedPlainRoomDocument, Room } from "@/app/mongoDb/models/room";
import { connectDB } from "@/app/mongoDb/mongodb";
import { ClassroomsSkeleton } from "../page";
import { BackButton } from "@/app/components/BackButton";
import ErrorFallback from "@/app/components/ErrorFallback";
import { DoorOpen } from "lucide-react";
import clsx from "clsx";

async function Classrooms({ buildingId }: { buildingId: string }) {
    let classrooms: PopulatedPlainRoomDocument[] = [];

    try {
        await connectDB();
        classrooms = await Room.find({ building: buildingId })
            .populate("building")
            .sort({ createdAt: 1 })
            .lean();
    } catch (e) {
        console.error(e);
        return <ErrorFallback error={e} />;
    }

    return (
        <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {classrooms.map((classroom) => (
                <li key={classroom._id.toString()}>
                    <Link
                        href={`${adminRoomsPage}/${classroom.building._id}/${classroom._id}`}
                        className={clsx(
                            "bg-green-secondary focus-visible:bg-green-tertiary active:bg-green-tertiary text-text-primary flex items-center gap-2 rounded-md p-4 shadow-md transition-all",
                            "hover:bg-green-tertiary active:bg-green-tertiary hover:scale-101 active:scale-100",
                        )}
                    >
                        <span className="rounded-lg border border-white/10 bg-white/5 p-2">
                            <DoorOpen size={30} />
                        </span>
                        <div>
                            <p className="truncate text-xl font-bold">
                                {classroom.code}
                            </p>
                            <p className="text-text-secondary truncate text-sm font-semibold">
                                {classroom.building.name}
                            </p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default async function BuildingPage({
    params,
}: Readonly<{ params: Promise<{ building: string }> }>) {
    const { building: buildingId } = await params;
    return (
        <>
            <BackButton dest={adminRoomsPage} />
            <BuildingNameHeader />
            <Divider text="Settings" />
            <BuildingSettings />
            <Divider text="Classrooms" />
            <AddClassroomComponent />
            <Suspense fallback={<ClassroomsSkeleton />}>
                <Classrooms buildingId={buildingId} />
            </Suspense>
        </>
    );
}
