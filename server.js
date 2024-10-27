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

const allowedOrigins = process.env.CORS_ACCESS?.split(',').map((origin) =>
  origin.trim()
);

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    console.log('Allowed origins:', allowedOrigins);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is allowed
    if (allowedOrigins?.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log('\x1b[34m%s\x1b[0m', ` http://localhost:${port}/`);
});
