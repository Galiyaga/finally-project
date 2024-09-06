import React, { useReducer } from "react";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import CardCarousel from "./Carousel";
import TariffCard from "./TariffCard";
import { useSelector } from "react-redux";

const cards = [
  {
    title: "Beginner",
    description: "Для небольшого исследования",
    color: "#FFB64F",
    image: <img src="src/assets/bulb.svg" />,
    tag: "Текущий тариф",
    price: "799 ₽",
    oldPrice: "1 200 ₽",
    period: "или 150 ₽/мес. при рассрочке на 24 мес.",
    featuresList: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
  },
  {
    title: "Pro",
    description: "Для HR и фрилансеров",
    color: "#7CE3E1",
    image: <img src="src/assets/cockshot.svg" style={{ margin: "0" }} />,
    price: "1 299 ₽",
    oldPrice: "2 600 ₽",
    period: "или 279 ₽/мес. при рассрочке на 24 мес.",
    featuresList: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
  },
  {
    title: "Business",
    description: "Для корпоративных клиентов",
    color: "#000000",
    image: <img src="src/assets/laptop.svg" />,
    price: "2 379 ₽",
    oldPrice: "3 700 ₽",
    period: "или 412 ₽/мес. при рассрочке на 24 мес.",
    featuresList: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
  },
];

export default function Homepage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
          <Link to="/search">
            <Button
              className={styles.button__request}
              disabled={!isAuthenticated}
              children={"Запросить данные"}
            />
          </Link>
          <h2 className={styles.title__why}>почему именно мы</h2>
        </div>
        <div className={styles.about__img} />
      </div>
      <CardCarousel />
      <div className={styles.img__tick}>
        <div className={styles.tick__bg} />
        <h2 className={`${styles.title__why} ${styles.title__tariff}`}>
          наши тарифы
        </h2>
      </div>
      <div className={styles.card__group}>
        {cards.map((card) => (
          <TariffCard
            key={card.title}
            title={card.title}
            description={card.description}
            color={card.color}
            image={card.image}
            tag={card.tag}
            price={card.price}
            oldPrice={card.oldPrice}
            period={card.period}
            featuresList={card.featuresList}
          />
        ))}
      </div>
    </>
  );
}
