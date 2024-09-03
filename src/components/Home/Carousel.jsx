import React from "react";
import { Carousel } from "primereact/carousel";
import styles from './Homepage.module.css'

const CardCarousel = () => {
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className={styles.slide__wrapper}>
        <div className={styles.slide__card}>
          <img src={product.src} alt={product.alt} />
          <h3>{product.h3}</h3>
        </div>
      </div>
    );
  };

  const products =[
    {
      src: "src/assets/speed.svg",
      alt: "Скорость",
      h3: 'Высокая и оперативная скорость обработки заявки',
    },
    {
      src: "src/assets/search.svg",
      alt: "Скорость",
      h3: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    },
    {
      src: "src/assets/protection.svg",
      alt: "Защита",
      h3: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    },
  ]

  return (
    <>
      <div className="corousel-container">
        <Carousel
          value={products}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          circular={true}
        />
      </div>
    </>
  );
}


export default CardCarousel;
