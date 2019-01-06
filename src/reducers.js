import { combineReducers } from 'redux';

import {
    GRIP_PROJECT
} 
from './actions';

const grip = (state = {}, action) => {
    switch (action.type) {
        case GRIP_PROJECT:
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    };
};

const rootReducer = combineReducers({
    grip
});

export default rootReducer;