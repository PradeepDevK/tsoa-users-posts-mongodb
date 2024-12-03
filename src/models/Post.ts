import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
    _id: Types.ObjectId; // Explicitly define _id as ObjectId
    title: string,
    content: string,
    userId: mongoose.Types.ObjectId,
}

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IPost>("Post", PostSchema);