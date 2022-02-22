import React from 'react';
import { parseRoute } from './lib';
import Header from './components/header';
import SubmitPage from './pages/submit';
import Home from './pages/home';
import AllList from './pages/all-list';
import NotFound from './pages/not-found';
import SearchBar from './components/search-bar';

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
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener(
      'hashchange', () => {
        this.setState({
          route: parseRoute(window.location.hash)
        });
      });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'all-list') {
      return <AllList />;
    }
    if (route.path === 'submit') {
      return <SubmitPage />;
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
            <SearchBar/>
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
