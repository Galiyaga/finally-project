import React, { useEffect, useState } from "react";
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
  const [documentsData, setDocumentsData] = useState()

  const simulatedIdData = {
    items: [
      {
        encodedId:
          "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
        influence: 700.0,
        similarCount: 3,
      },
      {
        encodedId:
          "1:fmYoHEjQrRbQhz3RiUtm4oCh0JLRmtCLIyU10IzigqzRgGjQmCoR0JFg0YRhwrVzN9CxDUM50KcpdTbRiNCLwpjRkuKAphXRkVxh0JU50K5uWdC50L7RjX0C0KwQRsKp",
        influence: 607.0,
        similarCount: 8,
      },
    ],
    mappings: [
      {
        inn: "7710137066",
        entityIds: [534868],
      },
    ],
  };

  useEffect(() => {
    if (previousRequest) {
      fetchData();
    }
  }, [previousRequest, token]);

  async function fetchData() {
    try {
      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/objectsearch",
        previousRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('response', response)

      if (!response.data.items.length) {
        console.log(
          "Вернулся пустой массив, используем моковые данные в результатах"
        );
        const ids = simulatedIdData.items.map((item) => item.encodedId);

        await fetchDocuments(ids);
      }
      
    } catch (error) {
      console.error("Ошибка запроса:", error);
      const ids = simulatedIdData.items.map((item) => item.encodedId);

      await fetchDocuments(ids);
    }
  }

  async function fetchDocuments(ids) {
    try {
      const documentResponse = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        { ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Document response:", documentResponse);
      setDocumentsData(documentResponse);
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }

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
      <div className="">
        <pre>{JSON.stringify(documentsData)}</pre>
      </div>
    </>
  );
}
