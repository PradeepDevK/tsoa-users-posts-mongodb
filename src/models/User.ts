import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId; // Explicitly define _id as ObjectId
    name: string,
    email: string,
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>("User", UserSchema);