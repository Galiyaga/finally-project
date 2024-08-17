import React from 'react';
import styles from './TariffCard.module.css'; // Предполагается использование CSS Modules
import { Button } from '../Button';

function TariffCard({
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
      <div className={styles.title} style={{ backgroundColor: color }}>
        <h1 className={styles.title__name}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <img src={image} />
      <div className={styles.priceContainer}>
        <div>{tag}</div>
        <span className={styles.price}>{price}</span>
        <span className={styles.crossedPrice}>{oldPrice}</span>
      </div>
      <span className={styles.period}>{period}</span>
      <ul>
        {featuresList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button>Подробнее</Button>
    </div>
  );
}

export default TariffCard;
