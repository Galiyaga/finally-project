import React, { useState, useEffect } from "react";
import styles from "./Rezultpage.module.css";

const XmlParserComponent = ({ xmlData, className }) => {
  const [sentences, setSentences] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  const decodeHTMLEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  useEffect(() => {
    // Извлечение URL изображения из тега <img>
    const imgExtracted = (xml) => {
      const decodeXml = decodeHTMLEntities(xml);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(decodeXml, "text/html");

      const imgTag = xmlDoc.querySelector("img");
      if (imgTag) {
        const src = imgTag.getAttribute("src");
        setImgUrl(src);
      } else {
      }
    };
    imgExtracted(xmlData);
    // Функция для парсинга XML
    const parseXml = (xml) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");

      // Извлечение предложений
      const sentenceNodes = xmlDoc.getElementsByTagName("sentence");
      const extractedSentences = [];
      for (let i = 0; i < sentenceNodes.length; i++) {
        let sentenceText = sentenceNodes[i].textContent.trim();
        sentenceText = removeHtmlTags(sentenceText);
        extractedSentences.push(sentenceText);
      }

      return extractedSentences;
    };

    // Функция для удаления HTML-тегов из строки
    const removeHtmlTags = (str) => {
      return str.replace(/<\/?[^>]+(>|$)/g, "");
    };

    // Парсим XML и сохраняем предложения в состоянии
    const sentences = parseXml(xmlData);
    setSentences(sentences);
  }, [xmlData]);

  return (
    <>
      <div className={styles.main__img}>
        {imgUrl ? (
          <img className={styles.img} src={imgUrl} alt="Картинка публикации" />
        ) : (
          <img
            className={styles.img}
            src="src/assets/imgHolder.png"
            alt="Картинка публикации"
          />
        )}
      </div>
      <div className={styles.main__content}>
        {sentences.map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
      </div>
    </>
  );
};

export default XmlParserComponent;
