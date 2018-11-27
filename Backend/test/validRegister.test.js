const validRegisterInput = require('../validator/register')
const regisInputTrue = {
        first_name : "dondon",
        last_name : "dondon",
        user_name : "admindondon5",
        email : "dondon@gmail.com",
        password1 : "123456",
        password2 : "123456",
        phonenumber : "0813819587",
        address : {
            address : "home",
            lat : 10,
            lng : 10,
            distance : 100
        },
        type : true
}

test('testValidRegisterInput', () => {
    var  {errors, isValid} = validRegisterInput(regisInputTrue)
    expect(isValid).toBe(true) 
})
