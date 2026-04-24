import "./user";
import { model, models, Schema, SchemaTypes } from "mongoose";

const instructorLog = new Schema({
    schedule: { type: SchemaTypes.ObjectId, required: true },
    user: { type: SchemaTypes.ObjectId, ref: "Instructor", required: true },
});
