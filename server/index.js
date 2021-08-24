import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import abstractRoutes from './routes/abstracts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/abstracts', abstractRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://ChesDev:Siphon&Eureka6.2@cluster0.opzrd.mongodb.net/eureka?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);