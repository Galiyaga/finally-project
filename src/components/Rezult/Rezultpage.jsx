import React, { useEffect } from "react";
import styles from "./Rezultpage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../context/authSlice";
import axios from "axios";

export default function Rezult() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
  const data = useSelector((state) => state.data.data);
  const previousRequest = useSelector((state) => state.data.previousRequest);
  const token = useSelector(selectAccessToken);


  useEffect(() => {
    if (previousRequest) {
      axios
        .post(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          previousRequest,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error);
        });
    }
  }, [previousRequest]);

  console.log("data", data);
  console.log("previousRequest", previousRequest);

  return (
    <>
      <div className="table__container">
        <div className="table__header">
          <div className="table__title date">Период</div>
          <div className="table__title total">Всего</div>
          <div className="table__title risk">Риски</div>
        </div>
        <div className="table__slider">
          <Slider {...settings}>
            {data.map((column, index) => (
              <div key={index} className="table__column">
                <div className="table__cell">{column.date}</div>
                <div className="table__cell">{column.total}</div>
                <div className="table__cell">{column.risk}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
