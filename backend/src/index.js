import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routes/authRouter.js';
import { connectDB } from './lib/db.js';

const app = express(); 

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

app.listen(PORT, ()=>{
    console.log(`Server is waiting at http://localhost:${PORT}`);
})