import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import NetworkError from './network-error';
import Trail from '../components/trail';

export default function AllList(props) {

  const [trails, setTrailList] = useState([]);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [networkError, setNetworkErrorStatus] = useState(false);

  useEffect(() => {
    fetchTrails();
  }, []);

  const fetchTrails = async () => {
    setFetchInProgress(true);
    try {
      const response = await fetch('/api/all-trails');
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
  if (fetchInProgress) {
    return <LoadingIndicator />;
  }
  const notDeletedTrails = trails.filter(trail => !trail.isDeleted).length;
  return (
    <>
      <div className="row justify-center" >
        <h3 className="add-trail-title">All Trails</h3>
      </div >
      <div>
        {notDeletedTrails === 0
          ? <p className="no-trail-msg">Woof! No trails were found :-( </p>
          : trails.filter(trail => !trail.isDeleted).map(trail => {
            return (
              <Trail key={trail.trailId} trail={trail} onOpenDeleteModal={props.onOpenDeleteModal} />
            );
          })
        }
      </div>
    </>
  );
}
