import express from "express";
import {protectedRoute} from "../middleware/audit,js";
import { getMessages, getUsersForSidebar, markMessageAsSeen } from "../controllers/messageController";


const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, getUsersForSidebar);
messageRouter.get("/:id", protectedRoute, getMessages);
messageRouter.put("mark/:id", protectedRoute, markMessageAsSeen);

export default messageRouter;

