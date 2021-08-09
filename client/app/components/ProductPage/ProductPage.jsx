import React from "react";
import styled from "styled-components";
import {getFromStorage, setInStorage} from '../../utils/storage.js';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.setProductInStorage = this.setProductInStorage.bind(this);
    }

    setProductInStorage() {
        let updated_cart = getFromStorage("the_main_app").cart;
        updated_cart.push(this.props.product);
        setInStorage("the_main_app", {
            cart: updated_cart,
            email: this.props.user_data.email,
            firstName: this.props.user_data.firstName,
            lastName: this.props.user_data.lastName,
            token: this.props.user_data.token,
            userId: this.props.user_data.userId
        });
    }

    render() {

        let Wrapper = styled.div`
            margin-top: 40px;
            width: 100%;
            height: 700px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        `;

        let Image = styled.img`
            width: 400px;
            height: 650px;
        `;

        let InfoWrapper = styled.div`
            width: 500px;
            min-height: 650px;
        `;

        let Button = styled.button`
            color:#fff;
            background-color:#0d6efd;
            border-color:#0d6efd;
            width: 150px;
            height: 50px;
            border-radius: 10px;
            margin-top: 30px;
        `;

        let Title = styled.h2 `
            font-size: 38px;
            margin-top: 70px;
        `;

        let Description = styled.h3`
            margin-top: 0px;
        `;

        let Price = styled.h1`
            margin-top: 150px;
        `;

        return <Wrapper>
            <Image src={this.props.product.image} />
            <InfoWrapper>
                <Title>Title: {this.props.product.title}</Title>
                <Description>Description: {this.props.product.description}</Description>
                <Price>Price: {this.props.product.price}</Price>
                <Button onClick={this.setProductInStorage}>Add to cart</Button>
            </InfoWrapper>
        </Wrapper>
    }
}

export default ProductPage;
