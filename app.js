const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require("./routes/index")
require('dotenv').config()
const app = express()
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD

app.use(bodyParser.json())
// app.use(cors())
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {   
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongoURI,{useNewUrlParser:true})
        .then(() => {
            console.log("mongoose connected");
        })
        .catch((err)=>{
            console.log("DB connectino fail", err)
        });

app.listen(5000, () => {
    console.log("server on 5000")
})