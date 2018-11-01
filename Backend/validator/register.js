const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorRegisterInput(data) {
    let errors = {};
    
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password1 = !isEmpty(data.password1) ? data.password1 : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    
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

    if(!Validator.isLength(data.user_name, { min : 2, max : 30 })){
        errors.user_name = 'Username must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.user_name)) {
        errors.user_name = 'Username field is required';
    }

    if(!Validator.isLength(data.phonenumber, { min : 9, max : 10 })){
        errors.phonenumber = 'Phonenumber must be between 9 and 10 Characters';
    }

    if(Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = 'Phonenumber field is required';
    }

    if(Validator.isEmpty(data.address)) {
        errors.address = 'Address field is required';
    }
    
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email filed is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password1)) {
        errors.password1 = 'Password filed is required';
    }

    if(!Validator.isLength(data.password1, {min : 6, max : 30})) {
        errors.password1 = 'password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password2, data.password1)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
    
}