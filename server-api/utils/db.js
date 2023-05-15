import mongoose from 'mongoose';
import config from '../config.js';

mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log('DB connection ok.'))
    .catch((err) => console.log('DB connection error!', err));

export default mongoose.connection;
