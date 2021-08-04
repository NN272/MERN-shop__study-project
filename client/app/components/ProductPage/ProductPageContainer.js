import React from 'react';
import {connect} from 'react-redux';
import {setProductInfo, toggleIsFetching} from '../../redux/reducers/productReducer.js';
import {withRouter} from "react-router-dom";
import ProductPage from "./ProductPage.jsx";
import {productAPI} from "../../api/api";

class ProductPageContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        productAPI.getProduct(id).then(response => {
            console.log(response)
            this.props.setProductInfo(response);
        });
    }

    render() {
        return <>
                   <ProductPage {...this.props} product={this.props.product} />
        </>
    }
}

let mapStateToProps = (state) => ({
    product: state.productPage.product,
    isFetching: state.productPage.isFetching
});

let withUrlDataComponent = withRouter(ProductPageContainer);

export default connect(mapStateToProps, {setProductInfo, toggleIsFetching})(withUrlDataComponent);
