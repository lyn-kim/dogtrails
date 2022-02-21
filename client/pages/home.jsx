import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
      image: [
        {
          id: 0,
          url: 'images/DSC02505.jpg'
        },
        {
          id: 1,
          url: 'images/DSC02236.jpg'
        },
        {
          id: 2,
          url: 'images/DSC01406.jpg'
        }
      ]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.pick = this.pick.bind(this);
  }

  // componentDidMount() {
  //   this.timer = setInterval(() => this.next(), 3000);
  // }

  // next() {
  //   clearInterval(this.timer);
  //   this.timer = setInterval(() => this.next(), 3000);
  //   if (this.state.currentImg === this.state.image.length - 1) {
  //     this.setState({ currentImg: 0 });
  //   } else {
  //     this.setState(prev => ({
  //       currentImg: prev.currentImg + 1
  //     }));
  //   }
  // }

  // previous() {
  //   clearInterval(this.timer);
  //   this.timer = setInterval(() => this.next(), 3000);
  //   const length = this.state.image.length - 1;
  //   if (this.state.currentImg === 0) {
  //     this.setState({ currentImg: length });
  //   } else {
  //     this.setState(prev => ({
  //       currentImg: prev.currentImg - 1
  //     }));
  //   }
  // }

  // pick(e) {
  //   clearInterval(this.timer);
  //   this.timer = setInterval(() => this.next(), 3000);
  //   const id = parseInt(e.target.dataset.id);
  //   this.setState({ currentImg: id });
  // }

  render() {
    return (
      <ShowImage/>
    );
  }
}

function ShowImage(props) {
  // const { id, url } = props.image;

  return (
    <>
      {/* <div className='landing-bg' style={{ backgroundImage: `url(${url})` }}>
      </div> */}
      <div className="row dot-container">
        <span><i data-image="0" className="dot fas fa-circle"></i></span>
        <span><i data-image="1" className="dot far fa-circle"></i></span>
        <span><i data-image="2" className="dot far fa-circle"></i></span>
      </div>
    </>
  );

}

// PRE-EDIT
// export default function Home(props) {
//   return (
//     <>
//       <div className='landing-bg' style={{ backgroundImage: 'url(images/DSC02505.jpg)' }}>
//       </div>
//       <div className='landing-bg' style={{ backgroundImage: 'url(images/DSC02236.jpg)' }}>
//       </div>
//       <div className='landing-bg' style={{ backgroundImage: 'url(images/DSC01406.jpg)' }}>
//       </div>
//     </>
//   );
// }
