import "./user";
import { model, models, Schema, SchemaTypes } from "mongoose";

const attendanceLogSchema = new Schema(
    {
        schedule: { type: SchemaTypes.ObjectId, required: true },
        user: { type: SchemaTypes.ObjectId, ref: "User", required: true },
        attendanceDate: { type: String, required: true },
    },
    { timestamps: true },
);

attendanceLogSchema.index(
    { schedule: 1, user: 1, attendanceDate: 1 },
    { unique: true },
);

export const AttendanceLog =
    models.AttendanceLog || model("AttendanceLog", attendanceLogSchema);
