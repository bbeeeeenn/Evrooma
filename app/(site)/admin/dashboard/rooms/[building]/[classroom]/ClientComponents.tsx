"use client";

import { useBuildingInfo } from "@/app/contexts/BuildingProvider";
import { useClassroomInfo } from "@/app/contexts/ClassroomProvider";
import { BuildingIcon, DoorClosed } from "lucide-react";

export function ClassroomCodeHeader() {
    const { classroomCode } = useClassroomInfo();
    const { buildingName } = useBuildingInfo();
    return (
        <>
            <p className="flex items-start gap-1 text-lg font-semibold">
                <BuildingIcon size={20} />
                {buildingName}
            </p>
            <h1 className="flex items-center gap-2 text-4xl font-bold">
                <DoorClosed size={30} />
                {classroomCode}
            </h1>
        </>
    );
}
