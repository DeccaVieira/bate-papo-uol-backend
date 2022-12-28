import { Router } from "express";

const participantsRouter = Router();    

participantsRouter.get("/participants");

export default participantsRouter;