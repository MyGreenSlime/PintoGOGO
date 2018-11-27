const validLoginInput = require('../validator/login')
const loginInputTrue = {
    user_name : "admin",
    password : "123456"
}
const loginInputNoUserName = {
    user_name : "",
    password : "123456"
}
const loginInputNoPass = {
    user_name : "admin",
    password : ""
}
test('testValidLoginInput', () => {
    var  {errors, isValid} = validLoginInput(loginInputTrue)
    expect(isValid).toBe(true) 
})
test('testValidLoginInputNoUserName', () => {
    var  {errors, isValid} = validLoginInput(loginInputNoUserName)
    expect(isValid).toBe(false) 
})
test('testValidLoginInputNoPass', () => {
    var  {errors, isValid} = validLoginInput(loginInputNoPass)
    expect(isValid).toBe(false) 
})