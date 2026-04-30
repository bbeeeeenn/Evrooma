import Loading from "@/app/(site)/loading";
import { isValidObjectId } from "mongoose";
import { Suspense } from "react";

async function Suspended({
    searchParams,
}: {
    searchParams: Promise<{ roomid?: string }>;
}) {
    const { roomid } = await searchParams;
    return roomid && isValidObjectId(roomid) ? <></> : <></>;
}

export default function Page({
    searchParams,
}: {
    searchParams: Promise<{ roomid?: string }>;
}) {
    return (
        <Suspense fallback={<Loading />}>
            <Suspended searchParams={searchParams} />
        </Suspense>
    );
}
