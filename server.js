import express from "express";
import { connectDB } from "./db/connection.js";
import userRouter from "./src/modules/user/user.router.js";
import messageRouter from "./src/modules/message/message.router.js";
import { globalErrorHandling } from "./src/middleware/asyncHandler.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/user', userRouter);
app.use('/message', messageRouter);

app.use(globalErrorHandling);

app.listen(port, () => console.log("Server listening on port", port));
