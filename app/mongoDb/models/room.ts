import { model } from "mongoose";
import { models, Schema, SchemaTypes } from "mongoose";

const roomSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    building: {
        type: SchemaTypes.ObjectId,
        ref: "Building",
        required: true,
    },
});

roomSchema.virtual("schedules", {
    ref: "Schedule",
    localField: "_id",
    foreignField: "room",
});

export const Room = models.Room || model("Room", roomSchema);
