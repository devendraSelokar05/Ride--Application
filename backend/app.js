import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import captainRoutes from "./routes/captain.routes.js"
import mapRoutes from "./routes/maps.routes.js"
import rideRoutes from "./routes/rides.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

dotenv.config()

ConnectDB()

app.use("/users" ,userRoutes)
app.use("/captains",captainRoutes)
app.use("/maps", mapRoutes)
app.use("/rides",rideRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app