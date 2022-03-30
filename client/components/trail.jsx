import React from 'react';

export default function Trail(props) {
  const { isDeleteButtonVisible } = props;
  const { trailId, trailName, length, location, photoUrl, difficulty } = props.trail;

  return (
    <article className="trail-entry">
      <img className="trail-img" src={photoUrl} alt="image of trail" />
      <div className="column-three-fifth trail-entry-description">
        <div className="row">
          <div className="column-three-fourth trail-name trail-description-element">{trailName}</div>
          {isDeleteButtonVisible && (
            <div className="column-fourth trail-name text-align-end">
              {
                <a onClick={() => props.onOpenDeleteModal(trailId)}>
                  <i className="trash-icon fas fa-trash icon-margin"></i>
                </a>
              }
            </div>
          )}
        </div>
        <div className="row display-block trail-description-element">
          <span className="trail-length-num">{length}</span>
          <span className="trail-length-mi">miles</span>
          <div>
            <div className={`pill pill-${difficulty}`}>
              { difficulty.toUpperCase() }
            </div>
          </div>
        </div>
        <div className="trail-address">{location}</div>
      </div>
    </article>
  );
}
