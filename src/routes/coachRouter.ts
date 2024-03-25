import {Router} from 'express'
import { createCoach, getAllCoaches, getCoachById } from '../endpoints/Coach/coach.controller.js'




const coachesRouter = Router()
const coachRouter = Router()


coachesRouter.get("/", getAllCoaches)
coachRouter.get("/:id", getCoachById)
coachRouter.post("/create", createCoach)


export {
    coachRouter,
    coachesRouter
}
