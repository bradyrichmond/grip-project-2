import { combineReducers } from 'redux';

import {
    GRIP_PROJECT,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} 
from './actions';

const grip = (state = {}, action) => {
    switch (action.type) {
        case GRIP_PROJECT:
            return { ...state, isFetching: action.isFetching };
        case LOGIN_REQUEST:
            return { ...state, isLoggingIn: action.isLoggingIn, loginError: false };
        case LOGIN_SUCCESS:
            return { ...state, isLoggingIn: action.isLoggingIn, loggedIn: action.loggedIn, isAdmin: action.isAdmin};
        case LOGIN_ERROR:
            return { ...state, isLoggingIn: action.isLoggingIn, loggedIn: false, loginError: action.loginError }
        default:
            return state;
    };
};

const rootReducer = combineReducers({
    grip
});

export default rootReducer;