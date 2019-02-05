import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {login, loginError} from './actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) { 
    super(props);
  }

  successfulLogin = (response) => {
    console.log(`Success: ${JSON.stringify(response)}`);
    this.props.dispatch(login(response));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn != nextProps.loggedIn) {
      this.props.history.push('/menu');
    }
  }

  errorLogin = (response) => {
    console.log(`Error: ${JSON.stringify(response)}`);
    this.props.dispatch(loginError());
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
            {this.props.loginError && <p className='error-message'>Login Failure</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.grip.loginError,
    loggedIn: state.grip.loggedIn
  }
}

export default connect(mapStateToProps)(Login);