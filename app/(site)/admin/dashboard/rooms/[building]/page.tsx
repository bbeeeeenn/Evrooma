import { adminRoomsPage } from "@/constants";
import { BackButton } from "../../ClientComponents";
import { BuildingNameHeader, BuildingSettings } from "./ClientComponents";

function Divider({ text }: { text: string }) {
    return (
        <div className="relative my-10 flex items-center justify-center font-bold sm:justify-start">
            <div className="bg-black-400 absolute inset-0 m-auto h-0.5 rounded-full"></div>
            <p className="text-black-400 bg-black-100 text-md absolute w-fit px-2 text-center tracking-wide sm:ml-10 sm:text-lg">
                {text}
            </p>
        </div>
    );
}

export default async function BuildingPage({
    params,
}: Readonly<{ params: Promise<{ building: string }> }>) {
    const { building: buildingId } = await params;
    return (
        <>
            <BackButton dest={adminRoomsPage} />
            <BuildingNameHeader />
            <Divider text="Settings" />
            <BuildingSettings buildingId={buildingId} />
            <Divider text="Classrooms" />
        </>
    );
}
