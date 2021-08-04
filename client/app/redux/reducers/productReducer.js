const SET_PRODUCT_INFO = "SET_PRODUCT_INFO";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    product: [],
    isFetching: false
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PRODUCT_INFO:
            return {...state, product: action.product}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export let setProductInfo = (product) => {
    return {type: SET_PRODUCT_INFO, product}
}

export let toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export default productReducer;
