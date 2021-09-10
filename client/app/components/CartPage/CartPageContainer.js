import React from 'react';
import {getFromStorage, setInStorage} from '../../utils/storage.js';
import styled from 'styled-components';
import CartProduct from './Product.jsx';

class CartPageContainer extends React.Component {
    render() {
        const cart = getFromStorage("the_main_app").cart;
        const data = getFromStorage("the_main_app");

        const Wrapper = styled.div`
            width: 100%;
        `;

        const ItemsWrapper = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
        `;

        let Button = styled.button`
            color:#fff;
            background-color:#0d6efd;
            border-color:#0d6efd;
            width: 140px;
            height: 50px;
            border-radius: 10px;
            margin-left: 750px;
            margin-top: 50px;
        `;

        return <div>
            <ItemsWrapper>
                {
                    cart.map(item => {
                        return <CartProduct id={item._id} history={this.props.history} data={data} cart={cart} image={item.image} title={item.title} price={item.price} category={item.category} />
                    })
                }

                <Button onClick={
                            () => setInStorage("the_main_app", {
                                cart: [],
                                email: data.email,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                token: data.token,
                                userId: data.userId
                            })
                        }>Order all</Button>
            </ItemsWrapper>
        </div>
    }
}

export default CartPageContainer;
