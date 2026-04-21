import { adminAccountsPage } from "@/constants";
import { BackButton } from "@/app/components/BackButton";
import { InstructorInfoComponent, ScheduleCard } from "./ClientComponents";
import { CalendarDays } from "lucide-react";
import { Suspense } from "react";
import {
    PopulatedPlainScheduleDocument,
    Schedule,
} from "@/app/mongoDb/models/schedule";
import { connectDB } from "@/app/mongoDb/mongodb";
import { Divider } from "@/app/components/Divider";
import { ScheduleCardSkeleton } from "@/app/(site)/ClientComponents";

async function GetSchedule({
    instructorId,
    day,
}: {
    instructorId: string;
    day: string;
}) {
    let schedules: PopulatedPlainScheduleDocument[] = []; // Populated Schedule Document
    try {
        await connectDB();
        schedules = await Schedule.find({
            instructor: instructorId,
            "slot.dayOfWeek": day,
        })
            .sort({ "slot.start.hour": 1 })
            .populate({ path: "room", populate: "building" })
            .lean();
    } catch (e) {
        console.error(e);
        return (
            <p className="text-text-primary">
                {e instanceof Error ? e.message : "Unexpected Error"}
            </p>
        );
    }
    return (
        schedules.length > 0 && (
            <>
                <Divider text={day} />
                {schedules.map((sched) => {
                    const startMeridiem: "AM" | "PM" =
                        sched.slot.start.hour < 12 ? "AM" : "PM";
                    const startHour =
                        sched.slot.start.hour % 12 === 0
                            ? 12
                            : sched.slot.start.hour % 12;
                    const startMinute = sched.slot.start.minute;
                    const endMeridiem: "AM" | "PM" =
                        sched.slot.start.hour < 12 ? "AM" : "PM";
                    const endHour =
                        sched.slot.end.hour % 12 === 0
                            ? 12
                            : sched.slot.end.hour % 12;
                    const endMinute = sched.slot.end.minute;
                    return (
                        <ScheduleCard
                            key={sched._id.toString()}
                            _id={sched._id.toString()}
                            building={sched.room.building.name}
                            buildingId={sched.room.building._id.toString()}
                            room={sched.room.code}
                            roomId={sched.room._id.toString()}
                            day={day}
                            endHour={endHour}
                            endMinute={endMinute}
                            endMeridiem={endMeridiem}
                            startHour={startHour}
                            startMinute={startMinute}
                            startMeridiem={startMeridiem}
                            subject={sched.subject}
                        />
                    );
                })}
            </>
        )
    );
}

export default async function InstructorInfoPage({
    params,
}: {
    params: Promise<{ instructor: string }>;
}) {
    const { instructor: instructorId } = await params;
    return (
        <>
            <BackButton dest={adminAccountsPage} />
            <InstructorInfoComponent />
            <div className="mt-10 flex items-center gap-3 text-white/90">
                <CalendarDays size={40} />
                <h1 className="text-4xl font-bold">Schedules</h1>
            </div>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Monday" />
            </Suspense>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Tuesday" />
            </Suspense>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Wednesday" />
            </Suspense>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Thursday" />
            </Suspense>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Friday" />
            </Suspense>
            <Suspense fallback={<ScheduleCardSkeleton />}>
                <GetSchedule instructorId={instructorId} day="Saturday" />
            </Suspense>
        </>
    );
}
