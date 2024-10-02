import { config } from 'dotenv';
config();
import express from 'express';
import path from 'path';
import errorHandler from './src/middleware/error-handler';
import routes from './src/routes/index';
const app = express();

app.use('/', routes);

// Error-handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
