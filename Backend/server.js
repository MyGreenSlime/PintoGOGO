const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbURI = "mongodb://localhost:27017/PintoGOGO";

const db = mongoose.connect(dbURI, { useNewUrlParser: true }, (err) =>{  
  console.log("connect to database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});



app.listen(3001, function() {
  console.log('Server Running port 3001');
})
