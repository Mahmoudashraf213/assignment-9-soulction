import { Message } from "../../../db/models/message.model.js";
import { AppError } from "../../utils/appError.js";

// Add message
export const addMessage = async (req, res, next) => {
  const { content, receiverId } = req.body;

  try {
    const message = new Message({ content, receiverId });
    const createdMessage = await message.save();

    if (!createdMessage) {
      return next(new AppError("Failed to create message", 500));
    }

    res.status(201).json({
      message: "Message created successfully",
      success: true,
      data: createdMessage,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// Read messages
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ receiverId: req.user.userId });

    res.status(200).json({
      message: "Messages retrieved successfully",
      success: true,
      data: messages,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// Delete message
export const deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return next(new AppError("Message not found", 404));
    }

    if (message.receiverId.toString() !== req.user.userId) {
      return next(new AppError("Unauthorized", 403));
    }

    await Message.findByIdAndDelete(messageId);

    res.status(200).json({
      message: "Message deleted successfully",
      success: true,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
