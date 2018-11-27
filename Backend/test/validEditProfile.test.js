const validEditProfileInput = require('../validator/editprofile')
const editProfileInputTrue = {
        first_name : "dondon",
        last_name : "dondon",
        email : "dondon@gmail.com",
        phonenumber : "0813819587",
}

test('testValidEditProfileInput', () => {
    var  {errors, isValid} = validEditProfileInput(editProfileInputTrue)
    expect(isValid).toBe(true) 
})
