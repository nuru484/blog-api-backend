import { config } from 'dotenv';
config();
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello blog api');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
