//Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3800
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Dogpark = require('./models/dogpark.js')
const dogparkController = require('./controllers/dogparks.js')
const usersController = require('./controllers/users.js')
const session = require('express-session')

//session
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET)
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Database Connection
const MONGODB_URI = process.env.DATABASE_URI
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: false,
})

//Database connection err/sucess
//Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.static('public'))
//Body parser: Add JSON data from request to the request object
app.use(express.json())
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/dogpark', dogparkController)
app.use('/users', usersController)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})