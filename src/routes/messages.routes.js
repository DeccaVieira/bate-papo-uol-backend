import {Router} from "express";

const messagesRouter = Router();

messagesRouter.get("/messages");
messagesRouter.post("/messages");


export default messagesRouter;