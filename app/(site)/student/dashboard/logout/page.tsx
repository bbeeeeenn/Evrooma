"use client";

import Loading from "@/app/(site)/loading";
import { LogoutStudent } from "@/app/actions/StudentAuthActions";
import { studentLoginPage } from "@/constants";
import { useEffect } from "react";

export default function AdminLogoutPage() {
    useEffect(() => {
        LogoutStudent().finally(() =>
            window.location.replace(studentLoginPage),
        );
    });

    return <Loading />;
}
