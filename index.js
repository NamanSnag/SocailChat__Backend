import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import './config/mongoose.js';
import route from './routes/index.js';

// Configuration
const port = process.env.PORT || 8001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(helmet());
// allow cross-origin requests
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}));
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cors());
app.use('./assets', express.static(path.join(__dirname, 'public/assets')));

// routes
app.use('/', route);

// error handler
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        succcess: false,
        status: errorStatus,
        message: message,
        stack: err.stack
    })
});

// server listening
app.listen(port, (err) => {
    if(err) return console.error(err);

    console.log(`server is up and running on ${port}`);
});