import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/';



const store = createStore(reducers, compose(
    applyMiddleware(reduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
       <Root/>
    </Provider>,
    document.querySelector('#root')
);