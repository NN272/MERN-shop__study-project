import React, {useState} from 'react';
import styled from 'styled-components';
import {setInStorage} from '../../utils/storage.js';

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
        border-radius: 5px;
    `;

    const InfoWrapper = styled.div`
        margin-left: 15px;
    `;

    const Category = styled.h3`
        margin-top: -0.5em;
    `;

    const Price = styled.h2`
        margin-top: 82px;
    `;

    const SecondEl = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 225px;
        margin-right: 20px;
    `;

    let AmountWrapper = styled.div`
        display: flex;
    `;

    let DecreaseAmount = styled.button`
        height: 20px;
        margin-right: 5px;
        width: 25px;
        font: revert;
    `;

    let IncreaseAmount = styled.button`
        height: 20px;
        margin-left: 5px;
        width: 25px;
        font: revert;
    `;

    let Button = styled.button`
        color:#fff;
        background-color:#0d6efd;
        border-color:#0d6efd;
        width: 140px;
        height: 50px;
        border-radius: 10px;
    `;

    const [amount, setAmount] = useState(1);

    const ifIndex = (element) => element._id === props.id;

    const removeItem = () => props.cart.splice(props.cart.findIndex(ifIndex), 1);

    return <Wrapper>
        <FirstEl>
            <Image src={props.image}></Image>
            <InfoWrapper>
                <h2>Title: {props.title}</h2>
                <Category>Category: {props.category}</Category>
                <Price>Price: {props.price}</Price>
            </InfoWrapper>
        </FirstEl>

        <SecondEl>
            <AmountWrapper>
                <DecreaseAmount onClick={
                        (amount > 1) ? () => setAmount(amount-1) : undefined
                }>-</DecreaseAmount>
                <h4 style={{marginBlockStart: "0px"}}>{amount}</h4>
                <IncreaseAmount onClick={() => setAmount(amount+1)}>+</IncreaseAmount>
            </AmountWrapper>

            <Button onClick={() => {
                        removeItem();
                        setInStorage("the_main_app", {
                            cart: props.cart,
                            firstName: props.data.firstName,
                            lastName: props.data.lastName,
                            email: props.data.email,
                            token: props.data.token,
                            userId: props.data.userId
                        })
                    }}>Order</Button>
        </SecondEl>
    </Wrapper>
}

export default CartProduct;
