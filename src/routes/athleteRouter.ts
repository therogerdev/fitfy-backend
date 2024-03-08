import { Router } from 'express';
import { getAllAthletes } from '../controller/athlete.js';

const athleteRouter = Router();

athleteRouter.get('/', getAllAthletes);

export default athleteRouter;
