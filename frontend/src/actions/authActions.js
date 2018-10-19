import {GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken'
import jwt_decode  from 'jwt-decode'
// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:4000/users/register' , userData)
            .then(res => history.push('/login'))
            .catch(err => 
                dispatch({
                    type : GET_ERRORS,
                    payload: err.response.data
                })
            );
};

//login - Get User token
export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:4000/users/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token);
            //set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decode = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decode));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data    
            })
        });
};

export const setCurrentUser = (decode) => {
    return {
        type : SET_CURRENT_USER,
        payload : decode
    }
}

//log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    //Set current user to {} which will set isAutherticated to false
    dispatch(setCurrentUser({}));
}