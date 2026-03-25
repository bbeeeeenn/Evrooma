"use client";
import React, { useContext, useState } from "react";

const BuildingInfoContext = React.createContext<{
    buildingId: string;
    buildingName: string;
}>({ buildingId: "", buildingName: "" });
const UpdateBuildingNameContext = React.createContext<
    (newName: string) => void
>(() => {});

export function BuildingInfoProvider({
    children,
    info,
}: Readonly<{
    children: React.ReactNode;
    info: { buildingId: string; buildingName: string };
}>) {
    const [buildingInfo, setBuildingInfo] = useState({ ...info });

    const updateBuildingName = (newName: string) => {
        setBuildingInfo((prev) => ({ ...prev, buildingName: newName }));
    };

    return (
        <BuildingInfoContext.Provider value={buildingInfo}>
            <UpdateBuildingNameContext.Provider value={updateBuildingName}>
                {children}
            </UpdateBuildingNameContext.Provider>
        </BuildingInfoContext.Provider>
    );
}

// HOOKS
export function useBuildingInfo() {
    return useContext(BuildingInfoContext);
}
export function useUpdateBuildingName() {
    return useContext(UpdateBuildingNameContext);
}
