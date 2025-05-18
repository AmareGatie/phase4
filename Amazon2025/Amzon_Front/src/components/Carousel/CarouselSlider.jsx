import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./carouselImgData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Carousel Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className={styles.hero__img__bottom}></div>
    </div>
  );
}

export default CarouselEffect;
