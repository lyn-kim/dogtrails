import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.showImg = this.showImg.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.goNext(), 5000);
  }

  showImg(id) {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.goNext(), 5000);
    this.setState({ currentImage: id });
  }

  goNext() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.goNext(), 5000);
    if (this.state.currentImage === this.props.imgArray.length - 1) {
      this.setState({ currentImage: 0 });
    } else {
      this.setState(prev => ({
        currentImage: prev.currentImage + 1
      }));
    }
  }

  goPrev() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.goNext(), 5000);
    if (this.state.currentImage === 0) {
      this.setState({ currentImage: this.props.imgArray.length - 1 });
    } else {
      this.setState(prev => ({
        currentImage: prev.currentImage - 1
      }));
    }
  }

  render() {

    const imgArray = this.props.imgArray;
    return (
      <>
        <div className='landing-bg' style={{ backgroundImage: `url(${imgArray[this.state.currentImage].url})` }}>
        </div>
        <div className="row dot-container">
          {
            imgArray.map(img => {
              return (
                this.state.currentImage === img.id
                  ? <div className='dot fas fa-circle' key={img.id} onClick={() => this.showImg(img.id)}></div>
                  : <div className='dot far fa-circle' key={img.id} onClick={() => this.showImg(img.id)}></div>);
            })
          }
        </div>
      </>
    );

  }

}

// { /* <div className="container">
//   <div className="row border">
//     <div className="column-fourth center">
//       <button className="previous" onClick={this.goPrev}><i className="fas fa-angle-left"></i></button>
//     </div>
//     <div className="column-half">
//       <div className="row center">
//         <img className="pic" src={imgArray[this.state.currentImage].url} />
//       </div>
//       <div className="row center dot-container">
//         {
//           imgArray.map(img => {
//             return (
//               this.state.currentImage === img.id
//                 ? <div className='dot fas fa-circle' key={img.id} onClick={() => this.showImg(img.id)}></div>
//                 : <div className='dot far fa-circle' key={img.id} onClick={() => this.showImg(img.id)}></div>);
//           })
//         }
//       </div>
//     </div>
//     <div className="column-fourth center">
//       <button className="next" onClick={this.goNext}><i className="fas fa-angle-right"></i></button>
//     </div>
//   </div>
// </div> */ }

// function ShowImage(props) {
//   // const { id, url } = props.image;

// return (
//   <>
//     {/* <div className='landing-bg' style={{ backgroundImage: `url(${url})` }}>
//     </div> */}
//     <div className="row dot-container">
//       <span><i data-image="0" className="dot fas fa-circle"></i></span>
//       <span><i data-image="1" className="dot far fa-circle"></i></span>
//       <span><i data-image="2" className="dot far fa-circle"></i></span>
//     </div>
//   </>
// );

// }

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
