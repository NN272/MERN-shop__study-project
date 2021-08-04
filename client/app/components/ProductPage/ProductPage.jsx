import React from "react";
import styled from "styled-components";

const ProductPage = (props) => {
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

    console.log(props);
    return(
        <Wrapper>
            <Image src={props.product.image} />
            <InfoWrapper>
                <Title>Title: {props.product.title}</Title>
                <Description>Description: {props.product.description}</Description>
                <Price>Price: {props.product.price}</Price>
                <Button>Add to cart</Button>
            </InfoWrapper>
        </Wrapper>
    );
}

export default ProductPage;
