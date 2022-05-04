import React from 'react';

export default function Header(props) {

  return (
    <div className="navbar">
      <div className="row space-between">
        <div>
          <span className="display-flex"><i className="fas fa-mountain logo"></i>
            <a href="#" className="logo-font"> DogTrails</a>
          </span>
        </div>
        <ul className="nav-list">
          <li className="nav-links"><a href="#all-list">EXPLORE</a></li>
          <li className="nav-links">
            {
              <a onClick={
                props.user === null
                  ? () => props.onOpenAuthModal()
                  : !props.menuOpen ? () => props.onShowMenu() : () => props.onHideMenu()
              }><i className="user-icon fas fa-user"></i></a>
            }
          </li>
        </ul>
      </div>
    </div>
  );
}
