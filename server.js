import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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
// Handle preflight requests
app.options('*', cors(corsOptions)); // Respond to preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Use Morgan middleware for logging requests
app.use(morgan('combined'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', routes);

// Error-handling middleware
app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log('\x1b[34m%s\x1b[0m', ` http://localhost:${port}/`);
  console.log(`Allowed origins: ${allowedOrigins}`);
});
