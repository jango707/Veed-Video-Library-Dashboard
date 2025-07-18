import express from 'express';
import videoRoutes from './routes/videoRoutes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Your server is running!');
});

app.use('/videos', videoRoutes);

export default app;
