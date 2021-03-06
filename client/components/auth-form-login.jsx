import React, { useState } from 'react';
import AuthFormSignUp from './auth-form-signup';

const DEFAULT_USERNAME = 'demo';
const DEFAULT_PASSWORD = 'password1';

export default function AuthFormLogin(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignupStatus] = useState(false);
  const [error, setErrorStatus] = useState(null);

  const clearError = () => {
    setErrorStatus(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    };
    try {
      const response = await fetch('/api/auth/sign-in', req);
      const data = await response.json();
      if (response.status === 401) {
        setErrorStatus('Invalid username or password');
        return;
      }
      if (data?.user && data?.token) {
        props.onSignIn(data);
        props.onCloseAuthModal();
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  function handleOpenSignupModal() {
    setSignupStatus(true);
  }

  if (signup) {
    return <AuthFormSignUp onSignIn={props.onSignIn} onCloseAuthModal={props.onCloseAuthModal}/>;
  }

  return (
    <div className="position-relative">
      <div id="modal-view" className="row">
        <div className="modal-bg position-fixed">
          <form onSubmit={handleSubmit}>
            <div className="auth-box modal-center">
              <div className="row justify-center">
                <a onClick={() => props.onCloseAuthModal()} ><i className="exit-icon fas fa-times"></i></a>
                <p className="get-started-msg">User Login</p>
              </div>
              {error && (
                <div className="row error-message">{error}</div>
              )}
              <div className="row">
                <label htmlFor="username" className="auth-input-label">Username:</label>
                <input
                  required
                  id="username"
                  type="text"
                  name="username"
                  className="auth-input"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    clearError();
                  }} />
              </div>
              <div className="row">
                <label htmlFor="password" className="auth-input-label">Password:</label>
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  className="auth-input"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    clearError();
                  }}
                  />
              </div>
              <div className="row">
                <button type="submit" className="auth-submit-btn">Login</button>
              </div>
              <div className='row space-between'>
                <a onClick={handleOpenSignupModal}><p className="auth-check-msg">First time? Sign Up</p></a>
                <a onClick={() => { setUsername(DEFAULT_USERNAME); setPassword(DEFAULT_PASSWORD); }} ><p className="demo-user-btn">Demo User Login</p></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

// export default class AuthFormLogin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       signup: false,
//       error: null
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleOpenSignupModal = this.handleOpenSignupModal.bind(this);
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//       error: null
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const req = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     };
//     fetch('/api/auth/sign-in', req)
//       .then(res => {
//         const result = res.json();
//         if (res.status === 401) {
//           this.setState({ error: 'Invalid username or password' });
//           return;
//         }
//         return result;
//       })
//       .then(result => {
//         if (result?.user && result?.token) {
//           this.props.onSignIn(result);
//           this.props.onCloseAuthModal();
//         }
//       });
//   }

//   handleOpenSignupModal() {
//     this.setState({ signup: true });
//   }

//   render() {
//     if (this.state.signup) {
//       return <AuthFormSignUp onSignIn={this.props.onSignIn} onCloseAuthModal={this.props.onCloseAuthModal} />;
//     }
//     return (
//       <div className="position-relative">
//         <div id="modal-view" className="row">
//           <div className="modal-bg position-fixed">
//             <form onSubmit={this.handleSubmit}>
//               <div className="auth-box modal-center">
//                 <div className="row justify-center">
//                   <a onClick={() => this.props.onCloseAuthModal()} ><i className="exit-icon fas fa-times"></i></a>
//                   <p className="get-started-msg">User Login</p>
//                 </div>
//                 {this.state.error && (
//                   <div className="row error-message">{this.state.error}</div>
//                 )}
//                 <div className="row">
//                   <label htmlFor="username" className="auth-input-label">Username:</label>
//                   <input
//                     required
//                     id="username"
//                     type="text"
//                     name="username"
//                     className="auth-input"
//                     value={this.state.username}
//                     onChange={this.handleChange} />
//                 </div>
//                 <div className="row">
//                   <label htmlFor="password" className="auth-input-label">Password:</label>
//                   <input
//                     required
//                     id="password"
//                     type="password"
//                     name="password"
//                     className="auth-input"
//                     value={this.state.password}
//                     onChange={this.handleChange} />
//                 </div>
//                 <div className="row">
//                   <button type="submit" className="auth-submit-btn">Login</button>
//                 </div>
//                 <div className='row space-between'>
//                   <a onClick={this.handleOpenSignupModal}><p className="auth-check-msg">First time? Sign Up</p></a>
//                   <a onClick={() => this.setState({ username: 'demo', password: 'password1' })}><p className="demo-user-btn">Demo User Login</p></a>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
