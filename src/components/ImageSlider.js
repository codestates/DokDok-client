import '../scss/ImageSlider.scss';
import React, { useEffect, useRef, useState } from 'react';

const ImageSlider = (props) => {
  const [sliderWidth, setSliderWidth] = useState(null);
  const [maxWidth, setMaxWidth] = useState(null);
  const [slideX, setSlideX] = useState(0);
  const imageSlider = useRef(null);

  const images = [];

  for (let image in props) {
    if (props[image]) {
      images.push(props[image]);
    }
  }

  const handleResize = () => {
    if (imageSlider.current.clientWidth >= 1000) {
      setSliderWidth(1000);
    } else {
      // if (sliderWidth === null) {
      //   setSliderWidth(imageSlider.current.clientWidth - 10);
      // } else {
      setSliderWidth(imageSlider.current.clientWidth);
      // }
    }
  };

  const slideContent = (e) => {
    if (e.target.className === 'fas fa-chevron-left fa-2x') {
      if (slideX === 0) {
        setSlideX((maxWidth - sliderWidth) * -1);
      } else {
        setSlideX(slideX + sliderWidth);
      }
    }
    if (e.target.className === 'fas fa-chevron-right fa-2x') {
      if (Math.abs(slideX) === maxWidth - sliderWidth) {
        setSlideX(0);
      } else {
        setSlideX(slideX - sliderWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if (sliderWidth === null) {
      handleResize();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (slideX !== 0) {
      setSlideX(0);
    }
    setMaxWidth(sliderWidth * images.length);
  }, [sliderWidth]);

  return (
    <div className="image-slider" ref={imageSlider}>
      <ul className="image-list">
        {images.length > 1 ? (
          <React.Fragment>
            {images.map((image, index) => (
              <li
                key={index}
                style={{
                  height: `${sliderWidth}px`,
                  transform: `translateX(${slideX}px)`,
                  backgroundImage: `url(${image})`,
                }}
              >
                <div className="slider-arrow">
                  <div
                    className="fas fa-chevron-left fa-2x"
                    onClick={slideContent}
                  ></div>
                  <div
                    className="fas fa-chevron-right fa-2x"
                    onClick={slideContent}
                  ></div>
                </div>
              </li>
            ))}
          </React.Fragment>
        ) : (
          <li
            style={{
              height: `${sliderWidth}px`,
              backgroundImage: `url(${images[0]})`,
            }}
          ></li>
        )}
      </ul>
    </div>
  );
};

export default ImageSlider;
