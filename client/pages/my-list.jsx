import React from 'react';
import LoadingIndicator from '../components/loading-indicator';
import NetworkError from './network-error';
import Trail from '../components/trail';
export default class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      fetchInProgress: false,
      networkError: false
    };
  }

  componentDidMount() {
    fetch('/api/my-trails', {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(this.setState({ fetchInProgress: true }))
      .then(res => res.json())
      .then(trails => {
        this.setState({
          trails: trails,
          fetchInProgress: false
        });
      }
      )
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
          <h3 className="add-trail-title">My Trails</h3>
        </div >
        <div>
          { notDeletedTrails === 0
            ? <p className="no-trail-msg">Woof! No trails were found :-( </p>
            : this.state.trails.filter(trail => !trail.isDeleted).map(trail => {
              return (
                <Trail isDeleteButtonVisible key={trail.trailId} trail={trail} onOpenDeleteModal={this.props.onOpenDeleteModal} />
              );
            })
          }
        </div>
      </>
    );
  }
}
