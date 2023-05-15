import express from 'express';
import cors from 'cors';
import config from './config.js';
import { default as db } from './utils/db.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import dishRouter from './routes/dishRouter.js';
import orderRouter from './routes/orderRouter.js';
import uploadRouter from './routes/uploadRouter.js';

app.use('/api/', userRouter);
app.use('/api/', categoryRouter);
app.use('/api/', dishRouter);
app.use('/api/', orderRouter);
app.use('/api/', uploadRouter);

app.listen(config.API_SERVER_PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server has been started...');
});
