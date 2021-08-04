import React from 'react';
import Product from './Product.jsx';
import {connect} from 'react-redux';
import {getProductsThunkCreator} from '../../../redux/reducers/productsReducer.js';
import styled from 'styled-components';

class ProductContainer extends React.Component {

    componentDidMount() {
        this.props.getProductsThunkCreator();
    }

    render() {
        const Wrapper = styled.div`
            margin-top: 100px;
        `;

        return <Wrapper>
            <Product
                products={this.props.products}
            />
        </Wrapper>
    }
}

let mapStateToProps = (state) => {
    return {
        products: state.homePage.products,
        isFetching: state.homePage.isFetching
    }
}

export default connect(mapStateToProps, {getProductsThunkCreator})(ProductContainer);
