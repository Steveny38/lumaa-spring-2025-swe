const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routers/authRouter')
const taskRouter = require('./routers/taskRouter')
const app = express()
const authTokenMiddleware = require('./middleware')
app.listen(process.env.PORT , (req, res) => {
    console.log(`Listening on Port ${process.env.PORT}`)
})

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json())

app.use("/auth", authRouter)
app.use("/",authTokenMiddleware, taskRouter)

