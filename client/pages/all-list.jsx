import React from 'react';
import DeleteButton from '../components/delete-icon';

export default class AllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: []
    };
  }

  componentDidMount() {
    fetch('/api/all-trails')
      .then(res => res.json())
      .then(trails => {
        this.setState({ trails });
      }
      );
  }

  render() {
    return (
        <>
        <div className="row justify-center" >
          <h3 className="add-trail-title">Trail List</h3>
        </div >
        <div>
          {
            this.state.trails.filter(trail => !trail.isDeleted).map(trail => {
              return (
                <div key={trail.trailId} className="row trail-entry">
                  <Trail trail={trail} />
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
  const { trailName, length, location, photoUrl, difficulty } = props.trail;

  return (
      <>
        <div className="column-three-fifth position-relative">
          <div className="row">
            <div className="column-three-fourth trail-name">
              <p className="trail-name">{trailName}</p>
            </div>
            <div className="column-fourth trail-name text-align-end">
              <DeleteButton/>
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
