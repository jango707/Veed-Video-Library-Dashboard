import express from 'express';
import videoRoutes from './routes/videoRoutes';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', // Whitelist frontend URL
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Your server is running!');
});

app.use('/videos', videoRoutes);

export default app;
