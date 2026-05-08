"use client";
import Loading from "../../../loading";
import { instructorLoginPage } from "@/constants";
import { LogoutInstructor } from "@/app/actions/InstructorAuthActions";
import { useEffect } from "react";

export default function AdminLogoutPage() {
    useEffect(() => {
        LogoutInstructor().finally(() =>
            window.location.replace(instructorLoginPage),
        );
    });

    return <Loading />;
}
