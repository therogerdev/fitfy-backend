import { Router } from 'express';
import { getAllAthletes, getAthleteById, createAthlete } from '../controller/AthleteController/index.js';

const athleteRouter = Router();

athleteRouter.get('/', getAllAthletes);
athleteRouter.get('/:id', getAthleteById);
athleteRouter.post('/create', createAthlete);

export default athleteRouter;
