"use server";

import { ServerActionResponse } from "./_";
import { connectDB } from "@/app/mongoDb/mongodb";
import { PlainUserDocument, User } from "@/app/mongoDb/models/user";
import { encrypt } from "@/app/lib/bcrypt";
import { AuthenticateAdmin } from "./AdminAuthActions";
import { revalidatePath } from "next/cache";
import { adminInstructorsPage } from "@/constants";
import { isValidObjectId } from "mongoose";
import { NormalizeName } from "../lib/utils";
import { Schedule } from "../mongoDb/models/schedule";
import { AttendanceLog } from "../mongoDb/models/log";

export type RawUserData = Omit<PlainUserDocument, "fullName" | "_id">;

export async function CreateUser(
    data: RawUserData,
): Promise<ServerActionResponse & { userId?: string }> {
    const { firstName, lastName, email, password, type } = data;

    if (type === "instructor" && !(await AuthenticateAdmin())) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }

    const normalizedFirstname = firstName
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[^a-zA-Z\s'-]/g, "")
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    const normalizedLastname = lastName
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[^a-zA-Z\s'-]/g, "")
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (
        !normalizedFirstname ||
        !normalizedLastname ||
        !normalizedEmail ||
        !normalizedPassword ||
        (type !== "instructor" && type !== "student")
    ) {
        return {
            status: "error",
            message: "Please complete all required fields.",
        };
    }

    const emailRegex = /^\S+@\S+\.\S+$/; // i need to study about regex >.<
    if (!emailRegex.test(normalizedEmail)) {
        return {
            status: "error",
            message: "Please provide a valid email address.",
        };
    }

    try {
        await connectDB();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        }).lean();

        if (existingUser) {
            return {
                status: "error",
                message: "User with such email already exists.",
            };
        }

        const hashedPassword = await encrypt(normalizedPassword);

        const newUser = await User.create({
            firstName: normalizedFirstname,
            lastName: normalizedLastname,
            email: normalizedEmail,
            username: normalizedEmail,
            password: hashedPassword,
            type,
        });
        revalidatePath(adminInstructorsPage);

        return {
            status: "success",
            message: `${type === "instructor" ? "Instructor" : "Student"} created successfully.`,
            userId: newUser._id.toString(),
        };
    } catch (e) {
        console.error("[CreateUser]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeUserFirstName(
    userId: string,
    fname: string,
): Promise<ServerActionResponse & { new?: string }> {
    if (!(await AuthenticateAdmin())) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }
    if (!isValidObjectId(userId)) {
        return {
            status: "error",
            message: "Invalid user ID",
        };
    }

    const firstName = NormalizeName(fname);
    if (!firstName) {
        return {
            status: "error",
            message: "Please provide a first name.",
        };
    }

    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }
        user.firstName = firstName;
        await user.save();
        revalidatePath(adminInstructorsPage);

        return {
            status: "success",
            message: "Renamed successfully",
            new: firstName,
        };
    } catch (e) {
        console.error("[ChangeUserFirstName]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeUserLastName(
    userId: string,
    lname: string,
): Promise<ServerActionResponse & { new?: string }> {
    if (!(await AuthenticateAdmin())) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }
    if (!isValidObjectId(userId)) {
        return {
            status: "error",
            message: "Invalid user ID",
        };
    }

    const lastName = NormalizeName(lname);
    if (!lastName) {
        return {
            status: "error",
            message: "Please provide a last name.",
        };
    }

    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }
        user.lastName = lastName;
        await user.save();
        revalidatePath(adminInstructorsPage);

        return {
            status: "success",
            message: "Renamed successfully",
            new: lastName,
        };
    } catch (e) {
        console.error("[ChangeUserLastName]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeUserPassword(
    userId: string,
    password: string,
): Promise<ServerActionResponse> {
    if (!(await AuthenticateAdmin())) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }
    if (!isValidObjectId(userId)) {
        return {
            status: "error",
            message: "Invalid user ID",
        };
    }

    const normalizedPassword = password.trim();
    if (!normalizedPassword) {
        return {
            status: "error",
            message: "Please provide a password.",
        };
    }

    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }
        user.password = await encrypt(normalizedPassword);
        await user.save();

        return {
            status: "success",
            message: "Password changed successfully",
        };
    } catch (e) {
        console.error("[ChangeUserPassword]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeUserEmail(
    userId: string,
    email: string,
): Promise<ServerActionResponse> {
    if (!(await AuthenticateAdmin())) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }
    if (!isValidObjectId(userId)) {
        return {
            status: "error",
            message: "Invalid user ID",
        };
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return {
            status: "error",
            message: "Please provide an email.",
        };
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
        return {
            status: "error",
            message: "Please provide a valid email address.",
        };
    }

    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }

        const existingUser = await User.findOne({
            _id: { $ne: user._id },
            email: normalizedEmail,
        }).lean();
        if (existingUser) {
            return {
                status: "error",
                message: "User with such email already exists.",
            };
        }

        user.email = normalizedEmail;
        await user.save();
        revalidatePath(adminInstructorsPage);

        return {
            status: "success",
            message: "Email changed successfully",
        };
    } catch (e) {
        console.error("[ChangeUserEmail]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function DeleteUser(
    userId: string,
): Promise<ServerActionResponse> {
    if (!isValidObjectId(userId))
        return {
            status: "error",
            message: "Invalid User ID.",
        };

    try {
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }

        if (user.type === "instructor") {
            await Schedule.deleteMany({ instructor: user._id });
        }

        await AttendanceLog.deleteMany({ user: user._id }); // Delete logs associated with the user
        await user.deleteOne();
        revalidatePath(adminInstructorsPage);

        return {
            status: "success",
            message: "Deleted successfully.",
        };
    } catch (e) {
        console.error("[DeleteUser]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}
