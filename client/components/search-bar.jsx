import React from 'react';

export default function SearchBar(props) {
  return (
    <div className="row">
      <div className="search-container column-full">
        <div className="row">
          <p className="quote">Find your adventure:</p>
        </div>
        <div className="row">
          <div className="search-bar">
            <div className="input-container">
              <form className="form-container">
                <span><i className="magnify-icon fas fa-search"></i></span>
                <label htmlFor="keyword" className="keyword-container">
                  <input className="keyword-box" required id="keyword" type="text" placeholder="Search by trail name or keyword" name="keyword" />
                </label>
                <span><button href="#searched-list" type="submit" className="go-button"><i className="go-button-icon fas fa-arrow-alt-circle-right"></i></button></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
