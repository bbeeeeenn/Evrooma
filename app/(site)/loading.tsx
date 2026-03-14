import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 m-auto flex size-fit items-center gap-3 text-4xl font-bold">
            <LoaderCircle size={30} className="animate-spin" /> Wait a sec
        </div>
    );
}
