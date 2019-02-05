import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_URL = process.env.API_URL || 'http://localhost:3001/api/tweets';

// GET
export const GRIP_PROJECT = 'GRIP_PROJECT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const DELETE_MENU_ITEM_REQUEST = 'DELETE_MENU_ITEM_REQUEST';
export const DELETE_MENU_ITEM_SUCCESS = 'DELETE_MENU_ITEM_SUCCESS';
export const DELETE_MENU_ITEM_ERROR = 'DELETE_MENU_ITEM_ERROR';

// POST
export const login = (response) => dispatch => {
    dispatch(loginRequest());
    axios.post('/api/tokensignin', response)
    .then((res) => {
      cookies.set('accessToken', res.data.accessToken);
      dispatch(loginSuccess(res.data.isAdmin));
    })
    .catch((failure) => {
      console.error('log in verification fail', failure);
      dispatch(loginError());
    });
}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
        isLoggingIn: true
    }
}

export const loginSuccess = (isAdmin) => {
    return {
        type: LOGIN_SUCCESS,
        isLoggingIn: false,
        loggedIn: true,
        isAdmin
    }
}

export const loginError = () => {
    return {
        type: LOGIN_ERROR,
        isLoggingIn: false
    }
}

// DELETE
// delete menu items
export const deleteMenuItem = (id) => dispatch => {
    dispatch(deleteMenuItemRequest());
    axios.delete(`${API_URL}/${id}`).then(() => {
        dispatch(deleteMenuItemSuccess());
    })
    .catch(err => {
        dispatch(deleteMenuItemError());
    });
}

export const deleteMenuItemRequest = () => {
    return {
        type: DELETE_MENU_ITEM_REQUEST
    }
}

export const deleteMenuItemSuccess = (isAdmin) => {
    return {
        type: DELETE_MENU_ITEM_SUCCESS
    }
}

export const deleteMenuItemError = () => {
    return {
        type: DELETE_MENU_ITEM_ERROR
    }
}

// GET
export const gripFetch = () => dispatch => {
    dispatch(gripFetchRequest());
    return axios.get(API_URL)
        .then(({ data }) => {
            dispatch(gripFetchSuccess(data));
        })
        .catch(res => {
            dispatch(gripFetchFailure());
        });
}

export const gripFetchRequest = () => {
    return {
        type: GRIP_PROJECT,
        isFetching: true
    }
}

export const gripFetchSuccess = () => {
    return {
        type: GRIP_PROJECT,
        isFetching: false
    }
}

export const gripFetchFailure = () => {
    return {
        type: GRIP_PROJECT,
        isFetching: false
    }
}