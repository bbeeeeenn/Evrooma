"use server";
import { compare, encrypt } from "../lib/bcrypt";
import { NormalizeName } from "../lib/utils";
import { User } from "../mongoDb/models/user";
import { connectDB } from "../mongoDb/mongodb";
import { ServerActionResponse } from "./_";
import { GetInstructorAuthInfo } from "./InstructorAuthActions";
import { GetStudentAuthInfo } from "./StudentAuthActions";

export async function ChangeMyFirstName(
    type: "student" | "instructor",
    fname: string,
): Promise<ServerActionResponse & { new?: string }> {
    const user =
        type === "student"
            ? await GetStudentAuthInfo()
            : await GetInstructorAuthInfo();

    if (!user) {
        return {
            status: "error",
            message: "Unauthorized.",
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
        const foundUser = await User.findById(user._id);
        if (!foundUser) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }
        foundUser.firstName = firstName;
        await foundUser.save();

        return {
            status: "success",
            message: "Renamed successfully",
            new: firstName,
        };
    } catch (e) {
        console.error("[ChangeMyFirstName]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeMyLastName(
    type: "student" | "instructor",
    lname: string,
): Promise<ServerActionResponse & { new?: string }> {
    const user =
        type === "student"
            ? await GetStudentAuthInfo()
            : await GetInstructorAuthInfo();

    if (!user) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }

    const lastname = NormalizeName(lname);
    if (!lastname) {
        return {
            status: "error",
            message: "Please provide a last name.",
        };
    }

    try {
        await connectDB();
        const foundUser = await User.findById(user._id);
        if (!foundUser) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }

        foundUser.lastName = lastname;
        await foundUser.save();

        return {
            status: "success",
            message: "Renamed successfully",
            new: lastname,
        };
    } catch (e) {
        console.error("[ChangeMyLastName]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}

export async function ChangeMyPassword(
    type: "student" | "instructor",
    oldPassword: string,
    _newPassword: string,
): Promise<ServerActionResponse> {
    const user =
        type === "student"
            ? await GetStudentAuthInfo()
            : await GetInstructorAuthInfo();

    if (!user) {
        return {
            status: "error",
            message: "Unauthorized.",
        };
    }

    const newPassword = _newPassword.trim();
    if (!newPassword) {
        return {
            status: "error",
            message: "Please provide a password.",
        };
    }
    if (newPassword.length < 8) {
        return {
            status: "error",
            message: "Password must be at least 8 characters long.",
        };
    }

    try {
        await connectDB();
        const foundUser = await User.findById(user._id);
        if (!foundUser) {
            return {
                status: "error",
                message: "User with such ID was not found.",
            };
        }

        if (!(await compare(oldPassword, foundUser.password))) {
            return {
                status: "error",
                message: "Incorrect password.",
            };
        }

        if (oldPassword === newPassword)
            return {
                status: "error",
                message:
                    "New password must not be the same as your old password.",
            };

        foundUser.password = await encrypt(newPassword);
        await foundUser.save();

        return {
            status: "success",
            message: "Password changed successfully",
        };
    } catch (e) {
        console.error("[ChangeMyPassword]", e);
        return {
            status: "error",
            message: "Something went wrong. Please try again later.",
        };
    }
}
