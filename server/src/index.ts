// src/index.ts
import express from 'express';

const app = express();
const PORT = 9999;

app.get('/', (_req, res) => {
  res.send('Hello Express Server');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
