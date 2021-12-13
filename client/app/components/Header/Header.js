import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { getFromStorage, setInStorage } from '../../utils/storage';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token: ""
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
            setInStorage("the_main_app", {
              cart: obj.cart
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const Header = styled.header`
      display: flex;
      justify-content: space-around; 
      align-items: center;
      width: 100%;
      height: 80px;
      border: 1px solid black;
    `;

    const LinksWrapper = styled.nav`
      display: flex;
      justify-content: space-around; 
      align-items: center;
      width: 50%;
      height: 80px;
    `;

    const LinkEl = styled(Link)`
      text-decoration: none;
      color: #1d1d1d;
    `;

    return (
      <Header>
        <LinksWrapper>
          <nav>
            <LinkEl to="/">Home</LinkEl>
          </nav>

          <nav>
            <LinkEl to="/helloworld">Hello World</LinkEl>
          </nav>

          <nav>
            <LinkEl to="/product">Product</LinkEl>
          </nav>

          <nav>
            <LinkEl to="/cart">Cart</LinkEl>
          </nav>
        </LinksWrapper>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: 80+"px"}}>
          {getFromStorage("the_main_app").token ? <p style={{marginBlockStart: 0+"px", marginBlockEnd: 0+"px"}}>{getFromStorage("the_main_app").firstName + " " + getFromStorage("the_main_app").lastName}</p> : <p>{"Вийди отсюда, розбійник"}</p>}
          {getFromStorage("the_main_app").token ? <button onClick={this.logout}>Logout</button> : null}
        </div>
      </Header>
    )
  }
};

export default Header;
