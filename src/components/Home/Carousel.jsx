import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CardCarousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };    
  
  return (
    <Slider {...settings}>
      <div className="slide__card">
        <img src="src\assets\speed.svg" alt="Скорость" />
        <h3>Высокая и оперативная скорость обработки заявки</h3>
      </div>
      <div className="slide__card">
       <img src="src\assets\search.svg" alt="Поиск" />
        <h3>Огромная комплексная база
           данных, обеспечивающая объективный
          ответ на запрос</h3>
      </div>
      <div className="slide__card">
        <img src="src\assets\protection.svg" alt="Защита" />
        <h3>Защита конфеденциальных сведений, не подлежащих разглашению по
        федеральному законодательству</h3>
      </div>
    </Slider>
  );
}


export default CardCarousel;
