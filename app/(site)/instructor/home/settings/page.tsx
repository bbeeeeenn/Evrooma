import { Cog } from "lucide-react";

export default function Page() {
    return (
        <>
            <h1 className="text-text-primary mt-3 flex items-center gap-2 text-3xl font-semibold">
                <span>
                    <Cog size={40} />
                </span>
                Settings
            </h1>
        </>
    );
}
