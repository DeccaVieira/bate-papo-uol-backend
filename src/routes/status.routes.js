import { Router } from "express";   

const statusRouter = Router();

statusRouter.post("/status");

export default statusRouter;