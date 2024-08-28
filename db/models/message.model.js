import { model, Schema } from "mongoose";

// schema
const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// model
export const Message = model('Message', messageSchema);
