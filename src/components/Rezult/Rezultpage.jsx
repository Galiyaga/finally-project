import React, { useEffect, useState } from "react";
import styles from "./Rezultpage.module.css";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../context/authSlice";
import XmlParserComponent from './XmlParserComponent';
import axios from "axios";

export default function Rezult() {

  const data = useSelector((state) => state.data.data);
  console.log('data: ', data)
  const previousRequest = useSelector((state) => state.data.previousRequest);
  const token = useSelector(selectAccessToken);
  const [documentsData, setDocumentsData] = useState()

  // Настройки для карусели
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

    const productTemplate = (column) => {
      return (
        <div className="table__column">
          <div className="table__cell-container">
            <div className="table__cell">{column.date}</div>
            <div className="table__cell">{column.total}</div>
            <div className="table__cell">{column.risk}</div>
          </div>
        </div>
      );
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

      if (response.data.items.length) {
        const ids = response.data.items.map((item) => item.encodedId);
        await fetchDocuments(ids);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }

  async function fetchDocuments(ids) {
    try {
      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        { ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const posts = response.data.map(el => el.ok)
      setDocumentsData(posts);
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
          <Carousel
            value={data}
            numVisible={8}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        </div>
      </div>
      <div className={styles.posts}>
        {documentsData?.map((post) => (
            <div className={styles.documents__wrapper} key={post.source.name}>
              <div className={styles.documents__card}>
                <div className={styles.card__about}>
                  <div className={styles.about__date}>
                    {formattedData(post.issueDate)}
                  </div>
                  <div className={styles.about__author}>
                    <a href={post.url}>{post.source.name}</a>
                  </div>
                </div>
                <div className={styles.card__header}>
                  <h2 className={styles.header__title}>
                    {post.title.text}
                  </h2>
                  {hasAttributes(post.attributes) ? (
                      <span className={styles.header__tag}>
                    {getAttributeLabel(post.attributes)}
                  </span>
                  ) : (
                      <span className={styles.header__tag_non}></span>
                  )}
                </div>
                <div className={styles.card__main}>
                  <XmlParserComponent xmlData={post.content.markup} />
                </div>
              </div>
              <button className={styles.card__button}>Читать в источнике</button>
              <span className={styles.card__wordcount}>
              {post.attributes.wordCount} слов
            </span>
            </div>
        ))}
      </div>
    </>
  );

}
