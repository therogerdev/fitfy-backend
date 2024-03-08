import express, {Express, Request, Response} from 'express'
import 'dotenv/config'
import athleteRouter from './routes/athleteRouter.js'


const app:Express = express()
const PORT = process.env.PORT

app.use(express.json())



app.get("/", (req: Request, res: Response) => {
  res.json({message: "Hello World!!" });
})

app.use("/api/athletes", athleteRouter )




app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:8001`),
)
