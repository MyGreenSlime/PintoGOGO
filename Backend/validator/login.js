const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorLoginInput(data) {
    let errors = {};
    
    data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.user_name)) {
        errors.user_name = 'Username filed is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password filed is required';
    }
    return {
        errors, 
        isValid: isEmpty(errors)
    }
    
}