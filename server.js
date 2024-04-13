const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const AuthRoute = require('./routes/auth')
const cors =require('cors')
const isAuthenticated = require('./middleware/isAuthenticated')
const app = express()

dotenv.config()

mongoose.connect(process.env.DB,{
  tls:true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

});

app.use(bodyParser.json());
app.use(cors())
app.listen(3000, () => {
    console.log('server is running')
})

app.use('/api', AuthRoute)
// app.use('/api/mentee', menteeRoute);