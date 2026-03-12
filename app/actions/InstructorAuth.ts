import { ServerActionResponse } from "./_";

interface InstructorAuthResponse extends ServerActionResponse {
    formData: FormData;
}

export type InstructorAuthAction = (
    _: unknown,
    formData: FormData,
) => Promise<InstructorAuthResponse>;

export async function InstructorAuth(
    _: unknown,
    formData: FormData,
): Promise<InstructorAuthResponse> {
    "use server";
    console.log(formData);
    await new Promise((res) => setTimeout(res, 1000));
    const username = formData.get("username") as string;
    // const password = formData.get("password") as string;

    return {
        status: "error",
        message: `Hi ${username}, this is an error message`,
        formData,
    };
}
