import { combineReducers } from 'redux';

import {
    GRIP_PROJECT,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_ERROR,
    FETCH_MENU_ITEMS_REQUEST,
    FETCH_MENU_ITEMS_SUCCESS,
    FETCH_MENU_ITEMS_ERROR
} 
from './actions';

const grip = (state = {menuItems: []}, action) => {
    switch (action.type) {
        case GRIP_PROJECT:
            return { ...state, isFetching: action.isFetching };
        case LOGIN_REQUEST:
            return { ...state, isLoggingIn: action.isLoggingIn, loginError: false };
        case LOGIN_SUCCESS:
            return { ...state, isLoggingIn: action.isLoggingIn, loggedIn: action.loggedIn, isAdmin: action.isAdmin};
        case LOGIN_ERROR:
            return { ...state, isLoggingIn: action.isLoggingIn, loggedIn: false, loginError: action.loginError };
        case DELETE_MENU_ITEM_REQUEST:
        case DELETE_MENU_ITEM_SUCCESS:
        case DELETE_MENU_ITEM_ERROR:
            return { ...state};
        case FETCH_MENU_ITEMS_REQUEST:
            return { ...state};
        case FETCH_MENU_ITEMS_SUCCESS:
            return { ...state, menuItems: action.menuItems};
        case FETCH_MENU_ITEMS_ERROR:
            return { ...state, menuItemFetchError: action.menuItemFetchError};
        default:
            return state;
    };
};

const rootReducer = combineReducers({
    grip
});

export default rootReducer;