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
        <img src="src\assets\speed.svg" alt="Скорость" />
        <Carousel.Caption>
          <h3>Высокая и оперативная скорость обработки заявки</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="src\assets\search.svg" alt="Поиск" />
        <Carousel.Caption>
          <h3>
            Огромная комплексная база данных, обеспечивающая объективный ответ
            на запрос
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src="src\assets\protection.svg" alt="Защита" />
        <Carousel.Caption>
          <h3>
            Защита конфеденциальных сведений, не подлежащих разглашению по
            федеральному законодательству
          </h3>
          <p>
            Защита конфеденциальных сведений, не подлежащих разглашению по
            федеральному законодательству
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CardCarousel;
