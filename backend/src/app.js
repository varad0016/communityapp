import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';
import groupRouter from './routes/group.routes.js';

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/events" , eventRouter);
app.use("/api/groups" , groupRouter);

export { app }