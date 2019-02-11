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
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';
export const FETCH_MENU_ITEMS_REQUEST = 'FETCH_MENU_ITEMS_REQUEST';
export const FETCH_MENU_ITEMS_SUCCESS = 'FETCH_MENU_ITEMS_SUCCESS';
export const FETCH_MENU_ITEMS_ERROR = 'FETCH_MENU_ITEMS_ERROR';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const POST_MENU_ITEM_REQUEST = 'POST_MENU_ITEM_REQUEST';
export const POST_MENU_ITEM_SUCCESS = 'POST_MENU_ITEM_SUCCESS';
export const POST_MENU_ITEM_ERROR = 'POST_MENU_ITEM_ERROR';
export const POST_CATEGORY_REQUEST = 'POST_CATEGORY_REQUEST';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS';
export const POST_CATEGORY_ERROR = 'POST_CATEGORY_ERROR';
export const PUT_CATEGORY_REQUEST = 'PUT_CATEGORY_REQUEST';
export const PUT_CATEGORY_SUCCESS = 'PUT_CATEGORY_SUCCESS';
export const PUT_CATEGORY_ERROR = 'PUT_CATEGORY_ERROR';


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

export const postMenuItem = (menuItem) => dispatch => {
    dispatch(postMenuItemRequest());
    axios.post('/api/menuitems', menuItem)
    .then(() => {
      dispatch(postMenuItemSuccess());
      dispatch(fetchMenuItems());
    })
    .catch((failure) => {
      console.error('post menu item error', failure);
      dispatch(postMenuItemError());
    });
}

export const postMenuItemRequest = () => {
    return {
        type: POST_MENU_ITEM_REQUEST
    }
}

export const postMenuItemSuccess = () => {
    return {
        type: POST_MENU_ITEM_SUCCESS
    }
}

export const postMenuItemError = () => {
    return {
        type: POST_MENU_ITEM_ERROR
    }
}

export const postCategory = (category) => dispatch => {
    dispatch(postCategoryRequest());
    axios.post('/api/categories', category)
    .then(() => {
      dispatch(postCategorySuccess());
      dispatch(fetchCategories());
    })
    .catch((failure) => {
      console.error('post category error', failure);
      dispatch(postCategoryError());
    });
}

export const postCategoryRequest = () => {
    return {
        type: POST_CATEGORY_REQUEST
    }
}

export const postCategorySuccess = () => {
    return {
        type: POST_CATEGORY_SUCCESS
    }
}

export const postCategoryError = () => {
    return {
        type: POST_CATEGORY_ERROR
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

export const deleteCategory = (id) => dispatch => {
    dispatch(deleteCategoryRequest());
    axios.delete(`/api/category/${id}`).then(() => {
        dispatch(deleteCategorySuccess());
        dispatch(fetchCategories());
        dispatch(fetchMenuItems());
    })
    .catch(err => {
        dispatch(deleteCategoryError());
    });
}

export const deleteCategoryRequest = () => {
    return {
        type: DELETE_CATEGORY_REQUEST
    }
}

export const deleteCategorySuccess = () => dispatch => {
    dispatch(fetchCategories());
    return {
        type: DELETE_CATEGORY_SUCCESS
    }
}

export const deleteCategoryError = () => {
    return {
        type: DELETE_CATEGORY_ERROR
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

export const fetchCategories = () => dispatch => {
    dispatch(fetchCategoriesRequest());
    axios.get('/api/categories')
    .then((response) => {
        dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
        dispatch(fetchCategoriesError(error));
    });
}

export const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST,
        categoriesFetchError: false
    }
}

export const fetchCategoriesSuccess = (categories) => {
    categories = categories.filter(category => !!category.text)

    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories
    }
}

export const fetchCategoriesError = () => {
    return {
        type: FETCH_CATEGORIES_ERROR,
        categoriesFetchError: true
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

// PUT
export const putCategory = (category) => dispatch => {
    dispatch(putCategoryRequest());
    axios.put(`/api/category/${category._id}`, category)
    .then(() => {
        dispatch(putCategorySuccess());
        dispatch(fetchCategories());
    })
    .catch((error) => {
        dispatch(putCategoryError(error));
    });
}

export const putCategoryRequest = () => {
    return {
        type: PUT_CATEGORY_REQUEST,
        categoryPutError: false
    }
}

export const putCategorySuccess = () => {
    return {
        type: PUT_CATEGORY_SUCCESS
    }
}

export const putCategoryError = () => {
    return {
        type: PUT_CATEGORY_ERROR,
        categoryPutError: true
    }
}