import React from 'react';
import NotFound from './not-found';

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      isSubmitted: false
    };
  }

  componentDidMount() {
    fetch('/api/searched-trails?trailName=' + encodeURIComponent(`${this.props.searchKeyword}`))
      .then(res => res.json())
      .then(trails => {
        this.setState({
          isSubmitted: true,
          trails: trails
        });
      });
  }

  render() {
    if (this.state.trails.length === 0) {
      return <NotFound/>;
    }
    return (
        <>
        <div className="row justify-center" >
          <h3 className="add-trail-title">Search Result</h3>
        </div >

        <div>
          {
            this.state.trails.map(trail => {
              return (
                <div key={trail.trailId} className="row trail-entry">
                  <Trail trail={trail} />
                </div>
              );
            })
          }
        </div>
        <div className="add-button">
          <label htmlFor='img-upload' className="image-upload-button">
            <a href="#submit"><i className="fas fa-plus-circle plus-button"></i></a>
            <a href="#submit"><p className="click-to-add">CLICK TO ADD</p></a>
          </label>
          <input id="img-upload" type="file" />
        </div>
      </>
    );
  }
}

function Trail(props) {
  const { trailName, isDeleted, length, location, photoUrl, difficulty } = props.trail;
  if (isDeleted === false) {
    return (
      <>
        <div className="column-three-fifth position-relative">
          <div className="row">
            <div className="column-three-fourth trail-name">
              <p className="trail-name">{trailName}</p>
            </div>
            <div className="column-fourth trail-name text-align-end">
              {/* <i className="fas fa-bookmark"></i>
              <i className="far fa-bookmark"></i>
              <i className="fas fa-trash icon-margin"></i> */}
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
}
