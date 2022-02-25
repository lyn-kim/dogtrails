import React from 'react';
import AuthFormSignUp from './auth-form-signup';

export default class AuthFormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signup: false
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenSignupModal = this.handleOpenSignupModal.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const req = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   };
  //   fetch('/api/auth/sign-in', req)
  //     .then(res => res.json())
  //     .then(result => {
  //       (result.user && result.token) {
  //         this.props.onSignIn(result);
  //       }
  //     });
  // }

  handleOpenSignupModal() {
    this.setState({ signup: true });
  }

  render() {
    if (this.state.signup) {
      return <AuthFormSignUp onCloseAuthModal={this.props.onCloseAuthModal}/>;
    }
    return (
      <div className="position-relative">
        <div id="modal-view" className="row">
          <div className="modal-bg position-fixed">
            <form>
              <div className="auth-box modal-center">
                <div className="row justify-center">
                  <a onClick={() => this.props.onCloseAuthModal()} ><i className="exit-icon fas fa-times"></i></a>
                  <p className="get-started-msg">User Login</p>
                </div>
                <div className="row">
                  <label htmlFor="username" className="auth-input-label">Username:</label>
                  <input
                    required
                    autoFocus
                    id="username"
                    type="text"
                    name="username"
                    className="auth-input"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="password" className="auth-input-label">Password:</label>
                  <input
                    required
                    autoFocus
                    id="password"
                    type="password"
                    name="password"
                    className="auth-input"
                    onChange={this.handleChange} />
                </div>
                <div className="row">
                  <button type="submit" className="auth-submit-btn">Login</button>
                </div>
                <a onClick={this.handleOpenSignupModal}><p className="auth-check-msg">First time? Sign Up</p></a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
