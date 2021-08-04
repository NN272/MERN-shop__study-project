import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import productReducer from './reducers/productReducer';

let reducers = combineReducers({
    homePage: productsReducer,
    productPage: productReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
