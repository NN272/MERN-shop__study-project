import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productsReducer from './reducers/productsReducer';

let reducers = combineReducers({
    homePage: productsReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
