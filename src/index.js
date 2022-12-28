import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);

app.listen (5000,()=> {
    console.log("Server Running in port 5000")
});

