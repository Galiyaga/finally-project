import React, { useEffect, useState } from "react";
import styles from "./Rezultpage.module.css";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../context/authSlice";
import XmlParserComponent from './XmlParserComponent';
import axios from "axios";
import { Button } from "../Button";
import styles2 from "../Loading.module.css";

export default function Rezult() {

  const data = useSelector((state) => state.data.data);
  const previousRequest = useSelector((state) => state.data.previousRequest);
  const token = useSelector(selectAccessToken);
  const [documentsData, setDocumentsData] = useState([])
  const [documentIds, setDocumentIds] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

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
    if (documentsData.length > 0) {
      localStorage.setItem('documentsData', JSON.stringify(documentsData));
    }
  }, [documentsData]);

  useEffect(() => {
    const savedDocuments = localStorage.getItem('documentsData');
    if (savedDocuments) {
      setDocumentsData(JSON.parse(savedDocuments));
    } else if (previousRequest) {
      fetchData();
    }
  }, [previousRequest, token]);


  function getIds() {
    const start = documentsData?.length || 0
    const postsPerRespCount = 10
    const documentIds = JSON.parse(localStorage.getItem('documentIds'))

    return documentIds.slice(start, start + postsPerRespCount)
  }

  async function fetchData() {
    if (dataLoading) return

    try {
      setDataLoading(true)
      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/objectsearch",
        previousRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataLoading(false)

      if (response.data.items.length) {
        const documentIds = response.data.items.map((item) => item.encodedId);
        localStorage.setItem('documentIds', JSON.stringify(documentIds))
        setDocumentIds(documentIds)
        await fetchDocuments();
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }

  async function fetchDocuments() {
    try {
      setDataLoading(true)

      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/documents",
        { ids: getIds() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataLoading(false)

      const newDocuments = response.data.map(el => el.ok);
      const updatedDocuments = [...(documentsData || []), ...newDocuments];
      setDocumentsData(updatedDocuments);
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

  // Функция для склонения слов

  function getWordDeclension(wordCount) {
    const lastDigit = wordCount % 10;
    const lastTwoDigits = wordCount % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'слов';
    }
  
    switch (lastDigit) {
      case 1:
        return 'слово';
      case 2:
      case 3:
      case 4:
        return 'слова';
      default:
        return 'слов';
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
        {documentsData?.map((post, index) => (
          <div className={styles.documents__wrapper} key={index}>
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
                <h2 className={styles.header__title}>{post.title.text}</h2>
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
            <div className={styles.card__footer}>
              <a  href={post.url}>
                <button className={styles.footer__button}>Читать в источнике</button>
              </a>
              <span className={styles.footer__wordcount}>
                {post.attributes.wordCount} {getWordDeclension(post.attributes.wordCount)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.posts__controls}>
        {dataLoading && (
          <div className={styles.loading__container}>
            <div className={styles2.loading}>Loading&#8230;</div>
          </div>
        )}
  
  {!dataLoading && documentIds.length > documentsData.length && (
  <Button
    className={styles.posts__button}
    onClick={fetchDocuments}
  >
    Показать еще
  </Button>
)}
      </div>
    </>
  );

}
