const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/user.js');
const menu = require('./routes/menu.js');
const packages = require('./routes/package.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const db = require('./config/keys.js').databaseURI;

mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Connect Database'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

//set router
//var user = require('./routes/user.js');
app.use('/users', users);
app.use('/menus', menu);
app.use('/package', packages);

app.listen(4000, function() {
  console.log('Server Running port 4000');
});
