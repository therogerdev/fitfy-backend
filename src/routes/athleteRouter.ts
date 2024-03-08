import { Router } from 'express';
import { createAthlete, getAllAthletes, getAthleteByEmail, getAthleteById } from '../controller/athlete.js';

const athleteRouter = Router();

athleteRouter.get('/', getAllAthletes);
athleteRouter.get('/:id', getAthleteById);
athleteRouter.post('/create', createAthlete);

export default athleteRouter;
