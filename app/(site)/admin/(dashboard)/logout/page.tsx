"use client";
import { LogoutAdmin } from "@/app/actions/AdminAuthActions";
import Loading from "../../../loading";
import { adminLoginPage } from "@/constants";
import { useEffect } from "react";

export default function AdminLogoutPage() {
    useEffect(() => {
        LogoutAdmin().finally(() => window.location.replace(adminLoginPage));
    });
    return <Loading />;
}
