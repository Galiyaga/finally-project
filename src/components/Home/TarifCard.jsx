import React from "react";
import styles from "./TarifCard.module.css"; // Предполагается использование CSS Modules
import { Button } from "../Button";

function TarifCard({
  title,
  description,
  color,
  image,
  tag,
  price,
  oldPrice,
  period,
  featuresList,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header} style={{ backgroundColor: color }}>
        <div
          className={title === "Business" ? styles.title__white : styles.title}
        >
          <h1 className={styles.title__name}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.header__img}>{image}</div>
      </div>
      {tag ? (
        <span className={styles.tag}>{tag}</span>
      ) : (
        <span className={styles.tag__non}></span>
      )}
      <div className={styles.tarif__parametrs}>
        <div className={styles.price__container}>
          <span className={styles.price}>{price}</span>
          <span className={styles.crossed__price}>{oldPrice}</span>
        </div>
        <span className={styles.period}>{period}</span>
        <div className={styles.options}>
          <h3>В тариф входит</h3>
          <ul>
            {featuresList.map((feature, index) => (
              <li className={styles.features__list} key={index}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {title === "Beginner" ? (
        <Button className={`${styles.button__tarif} ${styles.selected}`}>
          Перейти в личный кабинет
        </Button>
      ) : (
        <Button className={styles.button__tarif}>Подробнее</Button>
      )}
    </div>
  );
}

export default TarifCard;
