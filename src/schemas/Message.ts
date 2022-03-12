import mongoose, { Schema, Document } from "mongoose";

type Message = Document & {
    to: string;
    text: string;
    created_at: Date;
    roomId: String;
};

const MessageSchema = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    text: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    roomId: {
        type: String,
        ref: "ChatRoom"
    },
});

const Message = mongoose.model<Message>("Messages", MessageSchema);

export { Message };