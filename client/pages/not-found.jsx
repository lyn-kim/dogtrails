import React from 'react';

export default function NotFound(props) {
  return (
    <div>
      <div className="row justify-center">
        <h3 className="add-trail-title">Search Results</h3>
      </div>
      <p className="no-trail-msg">Woof! No trails were found :-( </p>
      <div className="add-button">
        <label htmlFor='img-upload' className="image-upload-button">
          <a href="#submit"><i className="fas fa-plus-circle plus-button"></i></a>
          <a href="#submit"><p className="click-to-add">CLICK TO ADD</p></a>
        </label>
        <input id="img-upload" type="file"/>
      </div>
    </div>
  );
}
