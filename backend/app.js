import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './db/connectDb.js';
import dataRoutes from './routes/dataRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

dotenv.config({ path: './.env' });


connectDb(process.env.MONGO_URI);


app.use('/api/data',dataRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
