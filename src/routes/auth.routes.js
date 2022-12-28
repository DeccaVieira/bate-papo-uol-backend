import { Router } from "express";
import SignUp, { SignIn } from "../controllers/auth.controlers.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", SignIn);

export default authRouter;