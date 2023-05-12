const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const connectDB = require('./config/db')
const errHandler = require('./middlewares/errHandler')
const PORT = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))

app.use(errHandler)

app.get('/', (req, res) => {
    res.send('base endpoint')
  })

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})