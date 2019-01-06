import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001/api/tweets';

// GET
export const GRIP_PROJECT = 'GRIP_PROJECT';

// POST

// DELETE

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