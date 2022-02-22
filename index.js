import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config()

const MONGO_DB = process.env.MONGO_DB_URL;

import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(helmet());
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = MONGO_DB;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
  })
  .catch((error) => console.log(error.message));
