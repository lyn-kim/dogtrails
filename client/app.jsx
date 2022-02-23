import React from 'react';
import { parseRoute } from './lib';
import Header from './components/header';
import SubmitPage from './pages/submit';
import Home from './pages/home';
import AllList from './pages/all-list';
import NotFound from './pages/not-found';
import SearchList from './pages/search-list';

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
      keyword: '',
      route: parseRoute(window.location.hash)
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      'hashchange', () => {
        this.setState({
          route: parseRoute(window.location.hash)
        });
      });
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    window.location.hash = `search-list?trailName=${this.state.keyword}`;
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'all-list') {
      return <AllList />;
    }
    if (route.path === 'submit') {
      return <SubmitPage />;
    }
    if (route.path === 'search-list') {
      const searchKeyword = route.params.get('trailName');
      return <SearchList searchKeyword={searchKeyword} />;
    }
    return <NotFound />;
  }

  render() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <>
          <Home imgArray={imgArray}/>
          <div className="container">
            <Header/>
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
        <div className="container">
          <Header/>
          { this.renderPage() }
        </div>
      </>
    );
  }
}
