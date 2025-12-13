import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
// import cookieParser from "cookie-parser";

import ConnectDB from './config/DB.js';
import plantRoutes from './routes/plant.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

ConnectDB();


app.use('/api/plants', plantRoutes);
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("listening....");
});
