import { config } from 'dotenv';
config();
import express from 'express';
import path from 'path';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello blog api');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
