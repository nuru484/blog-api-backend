import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorHandler from './src/middleware/error-handler.js';
import routes from './src/routes/index.js';
const app = express();

const allowedOrigins = process.env.CORS_ACCESS
  ? process.env.CORS_ACCESS.split(',')
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman and curl)
    if (!origin || allowedOrigins?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(':method :url :status :response-time ms'));

app.use('/', routes);

// Error-handling middleware
app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `App is listening on port ${port} at ` + '\x1b[34m%s\x1b[0m',
    ` http://localhost:${port}/`
  );
  console.log(`Allowed origins: ${allowedOrigins}`);
});
