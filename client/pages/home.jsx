import React, { useState, useEffect } from 'react';

export default function Home(props) {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(interval);
  });

  function showImg(id) {
    goNext();
    setCurrentImage(id);
  }

  function goNext() {
    if (currentImage === props.imgArray.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  const imgArray = props.imgArray;
  return (
    <>
      <div className='landing-bg' style={{ backgroundImage: `url(${imgArray[currentImage].url})` }}>
      </div>
      <div className="row dot-container">
        {
          imgArray.map(img => {
            return (
              currentImage === img.id
                ? <div className='dot fas fa-circle' key={img.id} onClick={() => showImg(img.id)}></div>
                : <div className='dot far fa-circle' key={img.id} onClick={() => showImg(img.id)}></div>);
          })
        }
      </div>
      <p className='sign'>photos by Lyn♥ </p>
    </>
  );
}
