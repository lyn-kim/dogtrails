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
            <li className="nav-links"><a href="#saved">SAVED</a></li>
            <li className="nav-links"><a href="#all-list">LIST</a></li>
            <li className="nav-links"><a href="#sign-in" ><i className="fas fa-user"></i></a></li>
          </ul>
        </div>
      </div>
  );
}
