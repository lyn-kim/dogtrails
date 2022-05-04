import React, { useState, useEffect } from 'react';
import NotFound from './not-found';
import LoadingIndicator from '../components/loading-indicator';
import NetworkError from './network-error';
import Trail from '../components/trail';

export default function SearchList(props) {

  const [trails, setTrailList] = useState([]);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [networkError, setNetworkErrorStatus] = useState(false);

  useEffect(() => {
    fetchTrails();
  }, []);

  const fetchTrails = async () => {
    setFetchInProgress(true);
    try {
      const response = await fetch('/api/searched-trails?trailName=' + encodeURIComponent(`${props.searchKeyword}`));
      const trails = await response.json();
      setTrailList(trails);
      setFetchInProgress(false);
    } catch (err) {
      setNetworkErrorStatus(true);
      console.error(err);
    }
  };

  if (networkError) {
    return <NetworkError />;
  }

  if (fetchInProgress === true) {
    return <LoadingIndicator />;
  }

  if (trails.length === 0) {
    return <NotFound/>;
  }

  return (
    <>
      <div className="row justify-center" >
        <h3 className="add-trail-title">Search Result</h3>
      </div >
      <div>
        {
          trails.filter(trail => !trail.isDeleted).map(trail => {
            return (
              <Trail key={trail.trailId} trail={trail} onOpenDeleteModal={props.onOpenDeleteModal} />
            );
          })
        }
      </div>
    </>
  );

}
