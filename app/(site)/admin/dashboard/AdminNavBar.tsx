"use client";

import {
    adminAccountsPage,
    adminChartsPage,
    adminLogoutPage,
    adminRoomsPage,
} from "@/constants";
import clsx from "clsx";
import {
    ChartNoAxesColumn,
    ChevronUp,
    DoorClosed,
    SquareArrowRightExit,
    UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AdminNavBar({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [shown, setShown] = useState(true);

    return (
        <>
            <div className={clsx("mt-10 transition-all", shown && "mt-28")}>
                {children}
            </div>
            <nav
                className={clsx(
                    "bg-black-400 text-black-100 divide-black-100 fixed inset-x-0 bottom-0 m-auto flex justify-evenly divide-x pt-3 pb-2 font-bold tracking-wide transition-transform sm:inset-x-1/12 sm:bottom-4 sm:max-w-2xl sm:rounded-full sm:py-4",
                    !shown &&
                        "translate-y-full sm:translate-y-[calc(100%+1rem)]",
                )}
            >
                <button
                    className={clsx(
                        "from-black-100 absolute bottom-full mb-1 cursor-pointer rounded-full border-0 bg-radial to-transparent p-1 transition-transform",
                        shown ? "rotate-180" : "animate-bounce",
                    )}
                    onClick={() => setShown((prev) => !prev)}
                >
                    <ChevronUp size={30} color="#1d1d1d" />
                </button>
                <div className="flex grow">
                    <Link
                        href={adminRoomsPage}
                        className="m-auto flex cursor-pointer flex-col items-center gap-2 text-xs hover:underline sm:flex-row sm:gap-3 sm:text-base"
                    >
                        <DoorClosed /> Rooms
                    </Link>
                </div>
                <div className="flex grow">
                    <Link
                        href={adminAccountsPage}
                        className="m-auto flex cursor-pointer flex-col items-center gap-2 text-xs hover:underline sm:flex-row sm:gap-3 sm:text-base"
                    >
                        <UsersRound /> Accounts
                    </Link>
                </div>
                <div className="flex grow">
                    <Link
                        href={adminChartsPage}
                        className="m-auto flex cursor-pointer flex-col items-center gap-2 text-xs hover:underline sm:flex-row sm:gap-3 sm:text-base"
                    >
                        <ChartNoAxesColumn /> Charts
                    </Link>
                </div>
                <div className="flex grow">
                    <Link
                        href={adminLogoutPage}
                        className="m-auto flex cursor-pointer flex-col items-center gap-2 text-xs hover:underline sm:flex-row sm:gap-3 sm:text-base"
                    >
                        <SquareArrowRightExit /> Logout
                    </Link>
                </div>
            </nav>
        </>
    );
}
