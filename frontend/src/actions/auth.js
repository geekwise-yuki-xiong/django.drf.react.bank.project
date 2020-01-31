import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    RESET_SUCCESS,
    RESET_FAIL
}
from './types';
// import auth from '../reducers/auth';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
      .get('http://127.0.0.1:8000/users/api/auth/user', config)
      .then(res => {
          dispatch({
            type: USER_LOADED,
            payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: AUTH_ERROR
          });
      });
};

// Login user
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body 
    const body = JSON.stringify({ username, password });

    axios
      .post('http://127.0.0.1:8000/users/api/auth/login', body, config)
      .then(res => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: LOGIN_FAIL
          });
          alert("Incorrect Credentials");
      });
};

// Password Reset
export const reset = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body 
    const body = JSON.stringify({ username, password });

    axios
      .put('http://127.0.0.1:8000/users/passwords', body, config)
      .then(res => {
          dispatch({
            type: RESET_SUCCESS,
            payload: res.data
          });
          alert("Password successfully reset. Please login with new password.")
      })
      .catch(err => {
          dispatch({
              type: RESET_FAIL
          });
          alert("Username not found");
      });
};

// Register new user
export const register = ({ username, email, password, groups }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body 
    const body = JSON.stringify({ username, email, password, groups });
    console.log(body);
    axios
      .post('http://127.0.0.1:8000/users/api/auth/register', body, config)
      .then(res => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
          });

      })
      .catch(err => {
          dispatch({
              type: REGISTER_FAIL
          });
          alert("Username cannot include spaces (OR) Invalid information was provided");

      });
};

// Logout user
export const logout = () => (dispatch, getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
      .post('http://127.0.0.1:8000/users/api/auth/logout', null, config)
      .then(res => {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
      })
      .catch(err => {
            console.log(err);
      });
};