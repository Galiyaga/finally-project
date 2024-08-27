import React, { useEffect, useState } from "react";
import styles from "./Rezultpage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../context/authSlice";
import XmlParserComponent from './XmlParserComponent';
import axios from "axios";

export default function Rezult() {
  // Настройки для компонента Slider
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

  // Моковые данные, так как сервер работает не корректно
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

  // Для отправки асинхронных запросов
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

      if (!response.data.items.length) { // Из-за ошибки с сервером возвращаются пустые данные
        console.log(
          "Вернулся пустой массив, используем моковые данные в результатах"
        );
        const ids = simulatedIdData.items.map((item) => item.encodedId);

        await fetchDocuments(ids);
      }
      
    } catch (error) { // Иногда возвращается ошибка без причины, поэтому логику повторяем, как при успешном ответе
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
      // Один из немногих ответов, который вовзращается корректно
      setDocumentsData(documentResponse.data[0].ok);
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }

  const formattedData = (date) => new Date(date).toLocaleDateString("ru-RU")

  const hasAttributes = (attributes) =>  attributes.isTechNews || attributes.isAnnouncement || attributes.isDigest

  const getAttributeLabel = (attributes) => {
    if(attributes.isTechNews) return "Технические новости"
    if(attributes.isAnnouncement) return "Анонсы и события"
    if(attributes.isDigest) return "Сводки новостей"
    else return null
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
      {documentsData && (
      <div className={styles.documents__wrapper}>
        <div className={styles.documents__card}>
          <div className={styles.card__about}>
            <div className={styles.about__date}>
              {formattedData(documentsData.issueDate)}
            </div>
            <div className={styles.about__author}>
              <a href={documentsData.url}>{documentsData.source.name}</a> 
            </div>
          </div>
          <div className={styles.card__header}>
            <h2 className={styles.header__title}>
            {documentsData.title.text}
            </h2>
            {hasAttributes(documentsData.attributes) ?
            (<span className={styles.header__tag}>{getAttributeLabel(documentsData.attributes)}</span>) 
            :
            (<span className={styles.header__tag_non}></span>)}
          </div>
          <div className={styles.card__main}>
            <XmlParserComponent xmlData={documentsData.content.markup} />
          </div>
        </div>
        <button className={styles.card__button}>Читать в источнике</button>
        <span className={styles.card__wordcount}>{documentsData.attributes.wordCount} слов</span>
      </div>
      )}
    </>
  );

}
