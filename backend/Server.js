import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';

import ConnectDB from './config/DB.js';
import plantRoutes from './routes/plant.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();


app.use('/api/plants', plantRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("listening....")
});
