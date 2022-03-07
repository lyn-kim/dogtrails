import React from 'react';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // if (!this.state.menuOpen) {
    //   return (
    //     <div onClick={this.showMenu} className="burger-menu">
    //       <i className="fas fa-bars fa-2x"></i>
    //     </div>
    //   );
    // }
    return (
      <div className="drawer-container">
        <div className="drawer-bg">
          <h1 className="drawer-title">User Menu</h1>
          <ol className="drawer-list">
            <li onClick={this.hideMenu} className="drawer-item">My List</li>
            <li onClick={this.hideMenu} className="drawer-item">Sign Out</li>
          </ol>
        </div>
        <div onClick={this.hideMenu} className="drawer-shadow"></div>
      </div>
    );
  }
}
