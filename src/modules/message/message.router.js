import { Router } from "express";
import { addMessage, getMessages, deleteMessage } from "./message.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { protect } from "../../middleware/authMiddleware.js";

const messageRouter = Router();

messageRouter.post('/', protect, asyncHandler(addMessage));
messageRouter.get('/', protect, asyncHandler(getMessages));
messageRouter.delete('/:messageId', protect, asyncHandler(deleteMessage));

export default messageRouter;
