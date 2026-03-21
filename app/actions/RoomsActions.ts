"use server";
// NOTE: You can directly import a server action from a client file basta ang file where the server action is declared has "use server" on top

import { adminRoomsPage } from "@/constants";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoDb/mongodb";
import { Building } from "../mongoDb/models/building";
import { ServerActionResponse } from "./_";

export type AddBuildingAction = (
    _: unknown,
    formData: FormData,
) => Promise<ServerActionResponse>;

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function AddBuilding(
    _: unknown,
    formData: FormData,
): Promise<ServerActionResponse> {
    const name = (formData.get("name") as string | null)?.trim() ?? "";

    if (!name) {
        return {
            status: "error",
            message: "Building name is required.",
        };
    }

    try {
        await connectDB();

        const existingBuilding = await Building.findOne({
            name: { $regex: `^${escapeRegex(name)}$`, $options: "i" },
        }).lean();

        if (existingBuilding) {
            return {
                status: "error",
                message: "Building already exists.",
            };
        }

        await Building.create({ name });
        revalidatePath(adminRoomsPage);

        return {
            status: "success",
            message: "Building added successfully.",
        };
    } catch (e) {
        console.error("[AddBuilding]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}
