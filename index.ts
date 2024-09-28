import express, { Express } from "express"
import * as database from "./config/database"
import dotenv from "dotenv"
import mainV1Routes from "./api/v1/routes/index.route"
import cors from "cors";

dotenv.config()
database.connect()

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

mainV1Routes(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})