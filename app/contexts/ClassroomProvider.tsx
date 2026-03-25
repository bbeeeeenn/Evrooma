"use client";
import React, { useContext, useState } from "react";

const ClassroomInfoContext = React.createContext<{
    classroomId: string;
    classroomCode: string;
}>({ classroomId: "", classroomCode: "" });
const UpdateClassroomNameContext = React.createContext<
    (newCode: string) => void
>(() => {});

export function ClassroomInfoProvider({
    children,
    info,
}: Readonly<{
    children: React.ReactNode;
    info: { classroomId: string; classroomCode: string };
}>) {
    const [buildingInfo, setClassroomInfo] = useState({ ...info });

    const updateClassroomName = (newCode: string) => {
        setClassroomInfo((prev) => ({ ...prev, classroomCode: newCode }));
    };

    return (
        <ClassroomInfoContext.Provider value={buildingInfo}>
            <UpdateClassroomNameContext.Provider value={updateClassroomName}>
                {children}
            </UpdateClassroomNameContext.Provider>
        </ClassroomInfoContext.Provider>
    );
}

// HOOKS
export function useClassroomInfo() {
    return useContext(ClassroomInfoContext);
}
export function useUpdateClassroomName() {
    return useContext(UpdateClassroomNameContext);
}
