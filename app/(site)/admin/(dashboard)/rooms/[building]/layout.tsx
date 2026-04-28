import Loading from "@/app/(site)/loading";
import { Building, PlainBuildingDocument } from "@/app/mongoDb/models/building";
import { connectDB } from "@/app/mongoDb/mongodb";
import { adminRoomsPage } from "@/constants";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BuildingInfoProvider } from "@/app/contexts/BuildingProvider";
import ErrorFallback from "@/app/components/ErrorFallback";

async function Suspended({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ building: string }>;
}) {
    const { building: buildingId } = await params;
    if (!isValidObjectId(buildingId)) {
        redirect(adminRoomsPage);
    }

    let building: PlainBuildingDocument;
    try {
        await connectDB();
        building = await Building.findById(buildingId).lean();
    } catch (e) {
        console.error(e);
        return <ErrorFallback error={e} />;
    }

    if (!building) {
        redirect(adminRoomsPage);
    }

    return (
        <BuildingInfoProvider
            info={{
                buildingId: building._id.toString(),
                buildingName: building.name,
            }}
        >
            {children}
        </BuildingInfoProvider>
    );
}

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ building: string }>;
}>) {
    return (
        <Suspense fallback={<Loading />}>
            <Suspended params={params}>{children}</Suspended>
        </Suspense>
    );
}
