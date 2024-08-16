import React from 'react';
import styles from './TariffCard.module.css'; // Предполагается использование CSS Modules
import { Button } from '../Button';

function TariffCard({ title, description, color, image, tag, price, oldPrice, period, featuresList }) {
  return (
    <div className={styles.card}>
        <div className={styles.title} style={{backgroundColor: color}}>
            <h1 className={styles.title__name}>{title}</h1>
            <p className={styles.description}>{description}</p>
        </div>
      <div className={styles.priceContainer}>
        <span className={styles.price}>799 ₽</span>
        <span className={styles.crossedPrice}>1 200 ₽</span>
      </div>
        <span className={styles.period}>или 150 ₽/мес. при рассрочке на 24 мес.</span>
      <ul className={styles.featuresList}>
        <li>Безлимитная история запросов</li>
        <li>Безопасная сделка</li>
        <li>Поддержка 24/7</li>
      </ul>
      <Button>Подробнее</Button>
    </div>
  );
}

export default TariffCard;
