import React from "react";
import styled from "styled-components";

const Product = (props) => {
  let Container = styled.div`
    height: 330px;
    width: 180px;
    background: #dadfe0;
    align-items: center;
    border-radius: 5px;
  `;

  let Image = styled.img`
    width: 180px;
    height: 240px;
    border-radius: 5px;
  `;

  let Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `;

  let Title = styled.h2`
    margin-top: 15px;
    margin-left: 10px;
    margin-block-end: 0px;
  `;

  let Price = styled.p`
    margin-top: 10px;
    margin-left: 10px;
    margin-block-end: 0px;
  `;

  return (
    <Wrapper>
      {
        props.products.map(
            p =>
                <Container>
                    <div>
                      <Image src={p.image}></Image>
                      <Title>{p.title}</Title>
                      <Price>{p.price} Гривнів</Price>
                    </div>
                </Container>
        )
      }
    </Wrapper>
  );
};

export default Product;
