const exp = require('constants')
const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require("cors")
const port = process.env.port || 5000
const connectDB = require('./config/db')

connectDB()

const app = express()



app.use(express.json())
app.use(cors())
app.listen(port, () => console.log(`asdasdas ${port}`))
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

app.use('/api/ads',require('./routes/adsRoutes'))
app.use('/api/comments',require('./routes/commentRoutes'))
app.use('/api/users',require('./routes/userRoutes'))



