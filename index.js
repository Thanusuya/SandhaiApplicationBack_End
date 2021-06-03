const express = require('express')
const app = express()
const port = 8081 || process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/uploads',express.static('uploads'));


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/RegisterDetails",{ useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',require('./routes/user_route'))

 

app.listen(port,()=>{
    console.log('port running on '+port)
})