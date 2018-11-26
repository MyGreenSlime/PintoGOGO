const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorEditProfileInput(data) {
    let errors = {};
    
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    if(!Validator.isLength(data.first_name, { min : 2, max : 30 })){
        errors.first_name = 'Firstname must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = 'Firstname field is required';
    }

    if(!Validator.isLength(data.last_name, { min : 2, max : 30 })){
        errors.last_name = 'Lastname must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Lastname field is required';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email filed is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(!Validator.isLength(data.phonenumber, { min : 9, max : 10 })){
        errors.phonenumber = 'Phonenumber must be between 9 and 10 Characters';
    }

    if(Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = 'Phonenumber field is required';
    }
    return {
        errors, 
        isValid: isEmpty(errors)
    }
    
}