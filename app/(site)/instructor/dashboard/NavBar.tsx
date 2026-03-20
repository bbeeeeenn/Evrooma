"use client";

import {
    instructorLogoutPage,
    instructorRoomsPage,
    instructorSchedulesPage,
} from "@/constants";
import clsx from "clsx";
import {
    CalendarCheck,
    ChevronUp,
    DoorClosed,
    SquareArrowRightExit,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function InstructorNavBar() {
    const [shown, setShown] = useState(true);
    const pathname = usePathname();

    return (
        <>
            <nav
                className={clsx(
                    "bg-black-400 text-black-100 divide-black-100 fixed inset-x-0 bottom-0 m-auto flex justify-evenly divide-x pt-3 pb-2 font-bold tracking-wide transition-transform sm:inset-x-1/12 sm:bottom-4 sm:max-w-xl sm:rounded-full sm:py-4",
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
                        href={instructorSchedulesPage}
                        className={clsx(
                            "group m-auto flex cursor-pointer flex-col items-center gap-2 text-xs decoration-2 underline-offset-4 sm:flex-row sm:gap-3 sm:text-base",
                            pathname.includes(instructorSchedulesPage) &&
                                "pointer-events-none underline",
                        )}
                    >
                        <CalendarCheck className="transition-transform group-hover:scale-110" />{" "}
                        Schedules
                    </Link>
                </div>
                <div className="flex grow">
                    <Link
                        href={instructorRoomsPage}
                        className={clsx(
                            "group m-auto flex cursor-pointer flex-col items-center gap-2 text-xs decoration-2 underline-offset-4 sm:flex-row sm:gap-3 sm:text-base",
                            pathname.includes(instructorRoomsPage) &&
                                "pointer-events-none underline",
                        )}
                    >
                        <DoorClosed className="transition-transform group-hover:scale-110" />{" "}
                        Rooms
                    </Link>
                </div>
                <div className="flex grow">
                    <Link
                        href={instructorLogoutPage}
                        className="group m-auto flex cursor-pointer flex-col items-center gap-2 text-xs decoration-2 sm:flex-row sm:gap-3 sm:text-base"
                    >
                        <SquareArrowRightExit className="transition-transform group-hover:scale-110" />{" "}
                        Logout
                    </Link>
                </div>
            </nav>
        </>
    );
}
