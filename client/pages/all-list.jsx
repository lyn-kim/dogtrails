import React from 'react';

export default class AllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <>
        <div className="row justify-center" >
          <h3 className="add-trail-title">Trail List</h3>
        </div >
        <div>
          {
            this.props.trails.filter(trail => !trail.isDeleted).map(trail => {
              return (
                <div key={trail.trailId} className="row trail-entry">
                  <Trail trail={trail} onOpenDeleteModal={this.props.onOpenDeleteModal}/>
                </div>
              );
            })
          }
        </div>
      </>
    );
  }
}

function Trail(props) {
  const { trailId, trailName, length, location, photoUrl, difficulty } = props.trail;

  return (
      <>
        <div className="column-three-fifth position-relative">
          <div className="row">
            <div className="column-three-fourth trail-name">
              <p className="trail-name">{trailName}</p>
            </div>
            <div className="column-fourth trail-name text-align-end">
              {
                <a onClick={() => props.onOpenDeleteModal(trailId)}><i className="trash-icon fas fa-trash icon-margin"></i></a>
              }
            </div>
          </div>
          <div className="row">
            <span className="trail-length-num">{length}</span><span className="trail-length-mi">miles</span>
          </div>
          <div className="row">
            {
              difficulty === 'easy'
                ? (
                <p className="intensity-rating-easy">EASY</p>
                  )
                : difficulty === 'moderate'
                  ? (
                <p className="intensity-rating-moderate">MODERATE</p>
                    )
                  : (
                <p className="intensity-rating-difficult">DIFFICULT</p>
                    )
            }
          </div>
          <div className="row">
            <p className="position-absolute trail-address">{location}</p>
          </div>
        </div>

        <div className="column-two-fifth">
          <img className="trail-img" src={photoUrl} alt="image of trail"/>
        </div>
      </>
  );

}
