import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './src/middleware/error-handler.js';
import routes from './src/routes/index.js';
const app = express();

const allowedOrigins = process.env.CORS_ACCESS;
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } else if (allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', routes);

// Error-handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
