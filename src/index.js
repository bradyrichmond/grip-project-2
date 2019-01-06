import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import App from './App';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));