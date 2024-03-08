import { Router } from 'express';
import { getAllAthletes, getAthleteById } from '../controller/athlete.js';

const athleteRouter = Router();

athleteRouter.get('/', getAllAthletes);
athleteRouter.get('/:id', getAthleteById);

export default athleteRouter;
