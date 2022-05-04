import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import NetworkError from './network-error';
import Trail from '../components/trail';

export default function MyList(props) {

  const [trails, setTrailList] = useState([]);
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [networkError, setNetworkErrorStatus] = useState(false);

  useEffect(() => {
    fetchTrails();
  }, []);

  const fetchTrails = async () => {
    setFetchInProgress(true);
    try {
      const response = await fetch('/api/my-trails', {
        method: 'GET',
        headers: {
          'X-Access-Token': window.localStorage.getItem('react-context-jwt')
        }
      });
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
        <h3 className="add-trail-title">My Trails</h3>
      </div >
      <div>
        { notDeletedTrails === 0
          ? <p className="no-trail-msg">Woof! No trails were found :-( </p>
          : trails.filter(trail => !trail.isDeleted).map(trail => {
            return (
              <Trail isDeleteButtonVisible key={trail.trailId} trail={trail} onOpenDeleteModal={props.onOpenDeleteModal} />
            );
          })
        }
      </div>
    </>
  );
}
