import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

export const User = models.User || model("User", userSchema);
