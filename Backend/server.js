const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path') 

const users = require('./routes/user.js');
const menus = require('./routes/menu.js');
const packages = require('./routes/package.js');
const orders = require('./routes/order.js')
const bills = require('./routes/bill.js')
const address = require('./routes/address.js')
const payment = require('./routes/payment.js')
const app = express();

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const db = require('./config/keys.js').databaseURI;

mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Connect Database'))
    .catch(err => console.log(err));

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



app.use('/api/users', users);
app.use('/api/menus', menus);
app.use('/api/packages', packages);
app.use('/api/orders', orders);
app.use('/api/bills', bills);
app.use('/api/address', address);
app.use('/api/payment', payment);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 4000

app.listen(port, function() {
  console.log('Server Running port', port);
});
