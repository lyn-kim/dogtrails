import React from 'react';

export default function Trail(props) {
  const { trailName, length, location, photoUrl, difficulty } = props.trail;

  return (
    <>
    <div className="row trail-entry">
      <div className="column-three-fifth position-relative">
        <div className="row">
          <div className="column-three-fourth trail-name">
            <p className="trail-name">{trailName}</p>
          </div>
        </div>
        <div className="row align-content-center">
          <div className="row display-block text-align-center">
            <span className="trail-length-num">{length}</span><span className="trail-length-mi">miles</span>
            <div className={`row pill pill-${difficulty}`}>
              { difficulty.toUpperCase() }
            </div>
          </div>
        </div>
        <div className="row">
          <p className="position-absolute trail-address">{location}</p>
        </div>
      </div>
      <div className="column-two-fifth">
        <img className="trail-img" src={photoUrl} alt="image of trail" />
      </div>
    </div>
    </>
  );
}
