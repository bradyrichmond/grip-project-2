import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';

import AddMenuItem from './components/AddMenuItem';
import AddCategory from './components/AddCategory';
import axios from 'axios';
const cookies = new Cookies();

class Login extends Component {
  constructor(props) { 
    super(props);
  }

  successfulLogin = (response) => {
    console.log(`Success: ${JSON.stringify(response)}`);
    axios.post('/api/tokensignin', response)
    .then((res) => {
      cookies.set('accessToken', res.data);
    })
    .catch((failure) => {
      console.error('log in verification fail', failure);
    });
  }

  errorLogin = (response) => {
    console.log(`Error: ${JSON.stringify(response)}`);
  }

  logoutSuccess = (response) => {
    console.log(`Log out success: ${response}`);
    cookies.remove('accessToken');
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="buttonContainer">
            <GoogleLogin
                clientId="862801180218-tb3ubh0gn3d8s0uqj17trbk0gn7e7lk8.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.successfulLogin}
                onFailure={this.errorLogin}
            />
        </div>
      </div>
    );
  }
}

export default Login;