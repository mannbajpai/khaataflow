import express from 'express';
import dotenv from "dotenv";
import { syncDb } from './models/index.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


syncDb();

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});