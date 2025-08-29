import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text:{type: String},
    // text:{type: String},
    seen:{type: Boolean, default: false}
}, {timestamps: true});

const Message = mongoose.model("message", messageSchema);

export default Message;