import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from './config/morgan.js';
import compression from 'compression';
import 'dotenv/config';
import { limiter } from './middleware/rateLimiter.js';
import athleteRouter from './routes/athleteRouter.js';
import config from './config/config.js';

const app: Express = express();

const PORT = process.env.PORT;

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!!' });
});

app.use('/api/athletes', athleteRouter);

app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`)
);
