import React from 'react';
import NotFound from './not-found';
import LoadingIndicator from '../components/loading-indicator';
import Trail from '../components/trail';

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: [],
      fetchInProgress: false
    };
  }

  componentDidMount() {
    fetch('/api/searched-trails?trailName=' + encodeURIComponent(`${this.props.searchKeyword}`))
      .then(this.setState({ fetchInProgress: true }))
      .then(res => res.json())
      .then(trails => {
        this.setState({
          trails: trails,
          fetchInProgress: false
        });
      });
  }

  render() {
    if (this.state.fetchInProgress === true) {
      return <LoadingIndicator />;
    }
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
            this.state.trails.filter(trail => !trail.isDeleted).map(trail => {
              return (
                <Trail key={trail.trailId} trail={trail} onOpenDeleteModal={this.props.onOpenDeleteModal} />
              );
            })
          }
        </div>
      </>
    );
  }
}
