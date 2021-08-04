import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const Footr = styled.footer`
    margin-top: 50px;
  `;

  return (
    <Footr>
      <hr />
      <p>Footer</p>
    </Footr>
  );
};

export default Footer;
