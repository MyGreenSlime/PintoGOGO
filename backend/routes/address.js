const express = require('express');
const router = express.Router();

var Address =  require('../models/address')

router.post('/add',function(request, response) {
    var newAddress = new Address();
    newAddress.location = request.body.location
    
    newAddress.save(function(err, savedLocation){
        if(err) {
            response.sendStatus(500);
        }else {
            response.send(savedLocation);
        }
    })
});

module.exports = router;