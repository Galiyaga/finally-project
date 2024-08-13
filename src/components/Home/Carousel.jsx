import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CardCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeKey={index} onSelect={handleSelect}>
      <Carousel.Item interval={2000}>
        <img src="src\assets\speed.svg" alt="Первая карточка" />
        <Carousel.Caption>
          <p>Высокая и оперативная скорость обработки заявки</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="..." alt="Second slide" />
        <Carousel.Caption>
          <h3>Заголовок второго слайда</h3>
          <p>Описание второго слайда...</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="..." alt="Third slide" />
        <Carousel.Caption>
          <h3>Заголовок третьего слайда</h3>
          <p>Описание третьего слайда...</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CardCarousel;
