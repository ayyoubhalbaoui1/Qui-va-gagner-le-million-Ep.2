// require('dotenv').config({path : ''})
const express = require('express')
const app= express()
require('./config/db')



const participationRoute = require('./routes/partcipant')
const adminRoute = require('./routes/admin')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "*"
    );
    next();
  });
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/participant',participationRoute)
app.use('/admin',adminRoute)


app.listen(3000,()=>console.log('server run'))
module.exports = app