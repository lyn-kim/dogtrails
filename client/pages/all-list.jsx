import React from 'react';
import LoadingIndicator from '../components/loading-indicator';
import NetworkError from './network-error';
export default class AllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      fetchInProgress: false,
      networkError: false
    };
  }

  componentDidMount() {
    this.setState({ fetchInProgress: true });
    fetch('/api/all-trails')
      .then(res => res.json())
      .then(trails => {
        this.setState({
          trails: trails,
          fetchInProgress: false
        });
      })
      .catch(err => {
        this.setState({ networkError: true });
        console.error(err);
      });
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchInProgress) {
      return <LoadingIndicator />;
    }
    const notDeletedTrails = this.state.trails.filter(trail => !trail.isDeleted).length;
    return (
      <>
        <div className="row justify-center" >
          <h3 className="add-trail-title">All Trails</h3>
        </div >
        <div>
          {notDeletedTrails === 0
            ? <p className="no-trail-msg">Woof! No trails were found :-( </p>
            : this.state.trails.filter(trail => !trail.isDeleted).map(trail => {
              return (
                <div key={trail.trailId} className="row trail-entry">
                  <Trail trail={trail} onOpenDeleteModal={this.props.onOpenDeleteModal} />
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
          </div>
          <div className="row align-content-center">
            <div className="row display-block text-align-center">
              <span className="trail-length-num">{length}</span><span className="trail-length-mi">miles</span>
              <div className="row">
                {
                  difficulty === 'easy'
                    ? <p className="intensity-rating-easy">EASY</p>
                    : difficulty === 'moderate'
                      ? <p className="intensity-rating-moderate">MODERATE</p>
                      : <p className="intensity-rating-difficult">DIFFICULT</p>
                }
              </div>
            </div>

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
