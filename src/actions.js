import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// GET
export const GRIP_PROJECT = 'GRIP_PROJECT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const DELETE_MENU_ITEM_REQUEST = 'DELETE_MENU_ITEM_REQUEST';
export const DELETE_MENU_ITEM_SUCCESS = 'DELETE_MENU_ITEM_SUCCESS';
export const DELETE_MENU_ITEM_ERROR = 'DELETE_MENU_ITEM_ERROR';
export const FETCH_MENU_ITEMS_REQUEST = 'FETCH_MENU_ITEMS_REQUEST';
export const FETCH_MENU_ITEMS_SUCCESS = 'FETCH_MENU_ITEMS_SUCCESS';
export const FETCH_MENU_ITEMS_ERROR = 'FETCH_MENU_ITEMS_ERROR';

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
    axios.delete(`/api/menuitem/${id}`).then(() => {
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

export const deleteMenuItemSuccess = () => dispatch => {
    dispatch(fetchMenuItems());
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
export const fetchMenuItems = () => dispatch => {
    dispatch(fetchMenuItemRequest());
    axios.get('/api/menuitems')
    .then((response) => {
        dispatch(fetchMenuItemSuccess(response.data));
    })
    .catch((error) => {
        dispatch(fetchMenuItemError(error));
    });
}

export const fetchMenuItemRequest = () => {
    return {
        type: FETCH_MENU_ITEMS_REQUEST,
        menuItemFetchError: false
    }
}

export const fetchMenuItemSuccess = (menuItems) => {
    return {
        type: FETCH_MENU_ITEMS_SUCCESS,
        menuItems
    }
}

export const fetchMenuItemError = () => {
    return {
        type: FETCH_MENU_ITEMS_ERROR,
        menuItemFetchError: true
    }
}

export const gripFetch = () => dispatch => {
    dispatch(gripFetchRequest());
    return axios.get('')
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