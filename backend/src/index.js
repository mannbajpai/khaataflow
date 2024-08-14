import express from 'express';
import dotenv from "dotenv";
import { syncDb } from './models/index.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import {
    authRoutes,
    expenseRoutes,
    userRoutes,
    groupRoutes,
    groupExpenseRoutes
} from "./routes/index.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN // Allow credentials (cookies) to be sent
    })
  );

//routes
app.use('/api/auth/', authRoutes);
app.use('/api/expense/', expenseRoutes);
app.use('/api/group/', groupRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/group/expense/', groupExpenseRoutes);


syncDb().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err=>{
    console.error('Unable to Connect', err);
})

