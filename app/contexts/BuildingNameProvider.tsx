"use client";
import React, { useContext, useState } from "react";

const BuildingNameContext = React.createContext<string>("");
const UpdateBuildingNameContext = React.createContext<
    (newName: string) => void
>(() => {});

export function BuildingNameProvider({
    children,
    name,
}: Readonly<{
    children: React.ReactNode;
    name: string;
}>) {
    const [buildingName, setBuildingName] = useState(name);

    const updateBuildingName = (newName: string) => {
        setBuildingName(newName);
    };

    return (
        <BuildingNameContext.Provider value={buildingName}>
            <UpdateBuildingNameContext.Provider value={updateBuildingName}>
                {children}
            </UpdateBuildingNameContext.Provider>
        </BuildingNameContext.Provider>
    );
}

// HOOKS
export function useBuildingName() {
    return useContext(BuildingNameContext);
}
export function useUpdateBuildingName() {
    return useContext(UpdateBuildingNameContext);
}
