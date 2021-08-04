import {productAPI} from '../../api/api';

const SET_PRODUCTS = 'SET_PRODUCTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    products: [],
    isFetching: false
}

const productsReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.products}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const setProducts = (products) => {
    return {type: SET_PRODUCTS, products}
}

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const getProductsThunkCreator = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        productAPI.getProducts().then(response => {
            dispatch(toggleIsFetching(false));
            dispatch(setProducts(response));
        });
    }
}

export default productsReducer;
