import React, { useReducer } from "react";
import styles from './Homepage.module.css'
import { Link } from "react-router-dom";
import { Button } from "../Button";
import CardCarousel from "./Carousel";

export default function Homepage() {
    // const [login, dispatch] = useReducer(reducer, false);
    return (
      <>
        <div className={styles.container}>
          <div className={styles.about}>
            <h1 className={styles.about__title}>
              сервис по поиску<br></br>публикаций<br></br> о компании<br></br>
              по его ИНН
            </h1>
            <p className={styles.about__text}>
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </p>
            <Link to="/autorization">
              <Button children={"Запросить данные"} autorization={false} />
            </Link>
            <h2 className={styles.titte__why}>почему именно мы</h2>
          </div>
          <div className={styles.about__img}>
            <img src="src\assets\aboutImg.svg" alt="Иллюстрация публикаций" />
          </div>
        </div>
        {/* <CardCarousel /> */}
      </>
    );
}