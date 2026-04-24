import "./user";
import { model, models, Schema, SchemaTypes } from "mongoose";

const attendanceLogSchema = new Schema(
    {
        schedule: { type: SchemaTypes.ObjectId, required: true },
        user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

export const AttendanceLog =
    models.AttendanceLog || model("AttendanceLog", attendanceLogSchema);
