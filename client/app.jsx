import React from 'react';
import { parseRoute } from './lib';
import Header from './components/header';
import SubmitPage from './pages/submit';
import Home from './pages/home';
import AllList from './pages/all-list';
import NotFound from './pages/not-found';
import SearchList from './pages/search-list';
import AuthFormSignUp from './components/auth-form-signup';
import decodeToken from './lib/decode-token';
import MyList from './pages/my-list';

const imgArray = [
  {
    id: 0,
    url: 'images/DSC02505.jpg'
  },
  {
    id: 1,
    url: 'images/DSC02236.jpg'
  },
  {
    id: 2,
    url: 'images/DSC01406.jpg'
  }
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      trailToDelete: null,
      keyword: '',
      authInProgress: false,
      user: null,
      isAuthorizing: true,
      menuOpen: false,
      route: parseRoute(window.location.hash)
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    this.deleteTrail = this.deleteTrail.bind(this);
    this.handleCloseSignUpModal = this.handleCloseSignUpModal.bind(this);
    this.handleOpenSignUpModal = this.handleOpenSignUpModal.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleHideMenu = this.handleHideMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      'hashchange', () => {
        this.setState({
          route: parseRoute(window.location.hash)
        });
      });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });

    this.fetchTrails();
  }

  fetchTrails() {
    fetch('/api/all-trails')
      .then(res => res.json())
      .then(trails => {
        this.setState({ trails });
      }
      );
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleOpenDeleteModal(trailId) {
    this.setState({ trailToDelete: trailId });
  }

  handleCloseDeleteModal() {
    this.setState({ trailToDelete: null });
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ keyword: '' });
    window.location.hash = `search-list?trailName=${this.state.keyword}`;
  }

  deleteTrail() {
    fetch(`/api/trails/${this.state.trailToDelete}`, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(() => {
        this.setState({
          trailToDelete: null
        });
      })
      .catch(err => console.error(err));

    this.fetchTrails();
  }

  handleOpenSignUpModal() {
    this.setState({ authInProgress: true });
  }

  handleCloseSignUpModal() {
    this.setState({ authInProgress: false });
  }

  handleShowMenu() {
    this.setState({ menuOpen: true });
  }

  handleHideMenu() {
    this.setState({ menuOpen: false });
  }

  renderAuthForm() {
    return <AuthFormSignUp onSignIn={this.handleSignIn} onCloseAuthModal={this.handleCloseSignUpModal} />;
  }

  renderMenu() {
    return (
      <div className="drawer-container">
        <div className="drawer-bg">
          <h2 className="drawer-title">User Menu</h2>
          <ol className="drawer-list">
            <li onClick={() => this.handleHideMenu()}><a className="drawer-item" href="#my-list">My List</a></li>
            <li onClick={() => this.handleHideMenu()} className="drawer-item">Sign Out</li>
          </ol>
        </div>
      </div>
    );
  }

  renderDeleteModal() {
    return (
      <div className="position-relative">
        <div id="modal-view" className="row">
          <div className="modal-bg position-fixed">
            <div className="modal-box modal-center">
              <div className="row justify-center">
                <a onClick={this.handleCloseDeleteModal}><i className="exit-icon fas fa-times"></i></a>
                <p className="delete-msg-main">Are you sure?</p>
                <p className="delete-msg-minor">Would you like to delete this trail? This process cannot be undone.</p>
              </div>
              <div className="row space-evenly">
                <button onClick={this.handleCloseDeleteModal} type="button" className="cancel-btn">CANCEL</button>
                <button onClick={this.deleteTrail} type="button" className="delete-btn">DELETE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'all-list') {
      return <AllList trails={this.state.trails} onOpenDeleteModal={this.handleOpenDeleteModal} />;
    }
    if (route.path === 'my-list') {
      return <MyList onOpenDeleteModal={this.handleOpenDeleteModal}/>;
    }
    if (route.path === 'submit') {
      return <SubmitPage />;
    }
    if (route.path === 'search-list') {
      const searchKeyword = route.params.get('trailName');
      return <SearchList searchKeyword={searchKeyword} onOpenDeleteModal={this.handleOpenDeleteModal}/>;
    }
    return <NotFound />;
  }

  render() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <>
          {this.state.authInProgress ? this.renderAuthForm() : null}
          <Home imgArray={imgArray}/>
          <div className="container">
            <Header onHideMenu={this.handleHideMenu} menuOpen={this.state.menuOpen} user={this.state.user} onShowMenu={this.handleShowMenu} onOpenAuthModal={this.handleOpenSignUpModal} />
            {this.state.menuOpen ? this.renderMenu() : null}
            <div className="row">
              <div className="search-container column-full">
                <div className="row">
                  <p className="quote">Find your adventure:</p>
                </div>
                <div className="row">
                  <div className="search-bar">
                    <div className="input-container">
                      <form onSubmit={this.handleSearch} className="form-container">
                        <span><i className="magnify-icon fas fa-search"></i></span>
                        <label htmlFor="keyword" className="keyword-container">
                          <input value={this.state.keyword} onChange={this.handleChange} className="keyword-box" required id="keyword" type="text" placeholder="Search by trail name or keyword" name="keyword" />
                        </label>
                        <span><button href="#search-list" type="submit" className="go-button"><i className="go-button-icon fas fa-arrow-alt-circle-right"></i></button></span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
      {this.state.trailToDelete ? this.renderDeleteModal() : null}
      {this.state.authInProgress ? this.renderAuthForm() : null}
        <div className="container">
          <Header onOpenAuthModal={this.handleOpenSignUpModal}/>
          { this.renderPage() }
        </div>
      </>
    );
  }
}
