import React from 'react';
import styled from 'styled-components';

const CartProduct = (props) => {
    const Wrapper = styled.div`
        margin-block-start: 50px;
        margin-block-end: 50px;
        height: 300px;
        width: 50%;
        border: 1px solid #b5b5b5;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `;

    const FirstEl = styled.div`
        display: flex;
        margin-left: 15px;
    `;

    const Image = styled.img`
        width: 150px;
    `;

    const InfoWrapper = styled.div`
        margin-left: 15px;
    `;

    const Category = styled.h3`
        margin-top: -0.5em;
    `;

    const Price = styled.h2`
        margin-top: 55px;
    `;

    return <Wrapper>
        <FirstEl>
            <Image src={props.image}></Image>
            <InfoWrapper>
                <h2>Title: {props.title}</h2>
                <Category>Category: {props.category}</Category>
                <Price>Price: {props.price}</Price>
            </InfoWrapper>
        </FirstEl>

    </Wrapper>
}

export default CartProduct;
