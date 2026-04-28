"use client";

import { DoorOpen } from "lucide-react";

export function ClassroomHeader({
    buildingName,
    classroomCode,
}: {
    buildingName: string;
    classroomCode: string;
}) {
    return (
        <>
            <p className="text-text-primary font-poppins mt-10 text-center font-semibold tracking-wide">
                {buildingName}
            </p>
            <div className="text-text-primary font-inter bg-green-secondary mt-3 flex items-center justify-center gap-2 rounded-md px-3 py-5 text-3xl font-bold shadow-md">
                <span>
                    <DoorOpen size={30} />
                </span>
                <p className="truncate">{classroomCode}</p>
            </div>
        </>
    );
}
