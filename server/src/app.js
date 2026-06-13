import express from "express";
import cors from "cors"



import { userRouter } from "./routes/auth_routes.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",userRouter)

export default app;
