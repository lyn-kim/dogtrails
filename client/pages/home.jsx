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

  componentWillUnmount() {
    clearInterval(this.timer);
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
        <p className='sign'>photos by Lyn♥ </p>
      </>
    );
  }
}
