const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/database')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const expressValidator = require('express-validator')
const cors = require('cors')
const dbURI = "mongodb://localhost:27017/PintoGOGO";

const db = mongoose.connect(config.database, { useNewUrlParser: true }, (err) =>{  
  console.log("connect to database");
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser())
app.use(cors())
app.use(expressValidator())
app.use(logger('dev'))

//Passport Config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

//set router
//var user = require('./routes/user.js');
var menu = require('./routes/menu.js');
var user = require('./routes/user.js');


app.use('/menus',menu);
app.use('/users',user);

app.listen(4000, function() {
  console.log('Server Running port 4000');
});
