"use client";

import { useAuthUpdate } from "@/app/contexts/AuthProvider";
import { instructorDashboardPage, instructorLoginPage } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLogout({
    action,
}: Readonly<{ action: () => Promise<void> }>) {
    const router = useRouter();
    const updateUser = useAuthUpdate();

    useEffect(() => {
        action()
            .then(() => {
                updateUser(null);
                router.replace(instructorLoginPage);
            })
            .catch(() => {
                router.replace(instructorDashboardPage);
            });
    }, [action, updateUser, router]);

    return <></>;
}
