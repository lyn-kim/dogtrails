import React from 'react';

export default class AllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trails: []
    };
  }

  //   componentDidMount() {
  //     fetch('/api/trails')
  //       .then(res => res.json())
  //       .then(trails => this.setState({ trails }));
  //   }

  //   render() {
  //     return (
  //       <div className="row justify-center">
  //         <h3 className="add-trail-title">Trail List</h3>
  //       </div>

  //       <div className="row">
  //         {
  //           this.state.trails.map(trail => (
  //             <div key={trail.trailId} className="row trail-entry">
  //               <Trail trail={trail} />
  //             </div>
  //           ))
  //         }
  //       </div>
  //     );
  //   }

  // }

  // function Trail(props) {
  //   const { trailName, length, difficulty, location, photoUrl } = props.trails;

  //   return (
  //     <>
  //       <div className="column-three-fifth position-relative">
  //         <div className="row">
  //           <div className="column-three-fourth trail-name">
  //             <p className="trail-name">{ trailName }</p>
  //           </div>
  //           <div className="column-fourth trail-name text-align-end">
  //             {/* <i class="fas fa-bookmark"></i> */}
  //             {/* <i class="far fa-bookmark"></i> */}
  //             {/* <i class="fas fa-trash icon-margin"></i> */}
  //           </div>
  //         </div>
  //         <div className="row align-content-center">
  //           <div className="row display-block text-align-center">
  //             <span className="trail-length-num">{ length }</span><span className="trail-length-mi">miles</span>
  //             <p className="intensity-rating-moderate">{ difficulty }</p>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <p className="position-absolute trail-address">{ location }</p>
  //         </div>
  //       </div>

//       <div className="column-two-fifth">
//         <img className="trail-img" src={photoUrl} alt="image of trail"/>
//       </div>
//   );
}
