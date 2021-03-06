import React, { Component } from "react";
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "../../utils/storage";

import ProductContainer from "./Product/ProductContainer.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      singUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpError: "",
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(
      this
    );
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onSignIn() {
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true,
    });

    // let cart = getFromStorage("the_main_app");
    // if(cart != null) {
    //   cart = getFromStorage("the_main_app").cart;
    // } else {
    //   cart = []
    // }

    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("the_main_app", {
            token: json.token,
            userId: json.uid,
            email: json.email,
            lastName: json.lastName,
            firstName: json.firstName,
            cart: []
          });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignUp() {
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: "",
            signUpLastName: "",
            signUpFirstName: "",
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign in</p>
            <input
              type="text"
              placeholder="email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <input
              type="password"
              placeholder="password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <button onClick={this.onSignIn}>Sign in</button>
          </div>
          <br />
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <input
              type="text"
              placeholder="email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <input
              type="text"
              placeholder="first name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            />
            <input
              type="text"
              placeholder="last name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}
            />
            <input
              type="password"
              placeholder="password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <button onClick={this.onSignUp}>Sign up</button>
          </div>
        </div>
      );
    }



    if (token) {
      return (
        <>
          <ProductContainer></ProductContainer>
        </>
      );
    }
  }
}

export default Home;
