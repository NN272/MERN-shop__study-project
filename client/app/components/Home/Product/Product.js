import React from "react";
import styled from "styled-components";

const Product = (props) => {
  let Wrapper = styled.div`
    height: 300px;
    width: 180px;
    background: gray;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  `;

  let Image = styled.img`
    width: 150px;
    height: 200px;
  `;

  let Title = styled.h2`
    margin-top: 10px;
    margin-block-end: 0px;
  `;

  let Price = styled.p`
    margin-top: 10px;
    margin-block-end: 0px;
  `;

  return (
    <Wrapper>
      <div>
        <Image src={props.imgsrc}></Image>
        <Title>TITLE</Title>
        <Price>PRICE</Price>
      </div>
    </Wrapper>
  );
};

export default Product;
