import React from 'react';
import {getFromStorage, setInStorage} from '../../utils/storage.js';
import styled from 'styled-components';
import CartProduct from './Product.jsx';

class CartPageContainer extends React.Component {
    render() {
        const cart = getFromStorage("the_main_app").cart;

        const Wrapper = styled.div`
            width: 100%;
        `;

        const ItemsWrapper = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
        `;

        return <div>
            <ItemsWrapper>
                {
                    cart.map(cart => {
                        return <CartProduct image={cart.image} title={cart.title} price={cart.price} category={cart.category} />
                    })
                }
            </ItemsWrapper>
        </div>
    }
}

export default CartPageContainer;
