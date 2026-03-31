"use client";
import React, { useContext, useState } from "react";

type InstructorContextData = {
    instructorId: string;
    email: string;
    fname: string;
    lname: string;
};

const InstructorContext = React.createContext<InstructorContextData>({
    instructorId: "",
    email: "",
    fname: "",
    lname: "",
});
const UpdateInstructorContext = React.createContext<
    (data: InstructorContextData) => void
>(() => {});

export function InstructorInfoProvider({
    children,
    data,
}: {
    children: React.ReactNode;
    data: InstructorContextData;
}) {
    const [instructor, setInstructor] = useState<InstructorContextData>({
        ...data,
    });

    const updateInstructor = (data: InstructorContextData) => {
        setInstructor(data);
    };

    return (
        <InstructorContext.Provider value={instructor}>
            <UpdateInstructorContext.Provider value={updateInstructor}>
                {children}
            </UpdateInstructorContext.Provider>
        </InstructorContext.Provider>
    );
}

export function useInstructorInfo() {
    return useContext(InstructorContext);
}

export function useUpdateInstructorInfo() {
    return useContext(UpdateInstructorContext);
}
