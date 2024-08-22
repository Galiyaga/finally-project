import React, { useState } from "react";
import styles from "./Searchpage.module.css";
import { Button } from "../Button";
import { Calendar } from "primereact/calendar";

function validateInn(inn) {
  const error = { code: 0, message: "" };
  let result = false;
  if (typeof inn === "number") {
    inn = inn.toString();
  } else if (typeof inn !== "string") {
    inn = "";
  }
  if (!inn.length) {
    error.code = 1;
    error.message = "ИНН пуст";
  } else if (/[^0-9]/.test(inn)) {
    error.code = 2;
    error.message = "ИНН может состоять только из цифр";
  } else if ([10, 12].indexOf(inn.length) === -1) {
    error.code = 3;
    error.message = "ИНН может состоять только из 10 или 12 цифр";
  } else {
    const checkDigit = (inn, coefficients) => {
      let n = 0;
      for (let i in coefficients) {
        n += coefficients[i] * inn[i];
      }
      return parseInt((n % 11) % 10);
    };
    switch (inn.length) {
      case 10:
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n10 === parseInt(inn[9])) {
          result = true;
        }
        break;
      case 12:
        const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
          result = true;
        }
        break;
    }
    if (!result) {
      error.code = 4;
      error.message = "Неправильное контрольное число";
    }
  }
  return { result, error };
}

export default function Searchpage() {
  const [inn, setInn] = useState("");
  const [innError, setInnError] = useState("");
  const [tonality, setTonality] = useState("Любая");
  const [documentsCount, setDocumentsCount] = useState("");
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });

  const handleInnChange = (e) => {
    setInn(e.target.value);
    //   const { result, error } = validateInn(e.target.value);
    //   if (!result) {
    //     setInnError(error.message);
    //   } else {
    //     setInnError("");
    //   }
  };

  const checkDates = (start, end) {
    const now = new Date()
    now.setHours(0,0,0,0)
    
    if(start > end || start > now || end > now) {
     const error = 'Введите корректные данные'
    }
  }

  const 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ inn, tonality, documentsCount, dateRange });
  };
  return (
    <>
      <div className={styles.search__container}>
        <h1 className={styles.searh__title}>
          Найдите необходимые <br></br> данные в пару кликов.
        </h1>
        <p className={styles.search__about}>
          Задайте параметры поиска. <br></br>Чем больше заполните, тем точнее
          поиск
        </p>
        <form onSubmit={handleFormSubmit} className={styles.search__form}>
          <div className={styles.form__main}>
            <div className={styles.form__input}>
              <div className={styles.item__input}>
                <label>
                  ИНН компании*:
                  <input
                    type="text"
                    value={inn}
                    onChange={handleInnChange}
                    placeholder="10 цифр"
                  />
                </label>
                {innError && <div className="error">{innError}</div>}
              </div>

              <div className={styles.item__input}>
                <label>
                  Тональность:
                  <select
                    value={tonality}
                    onChange={(e) => setTonality(e.target.value)}
                  >
                    <option value="Позитивная">Позитивная</option>
                    <option value="Негативная">Негативная</option>
                    <option value="Любая">Любая</option>
                  </select>
                </label>
              </div>

              <div className={styles.item__input}>
                <label>
                  Количество документов в выдаче*:
                  <input
                    type="number"
                    value={documentsCount}
                    onChange={(e) => setDocumentsCount(e.target.value)}
                    min="1"
                    max="1000"
                    placeholder="От 1 до 1000"
                  />
                </label>
              </div>
            </div>
            <div className={styles.form__checkbox}>
              <div className={styles.checkbox__item}>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span> Признак максимальной полноты</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Упоминания в бизнес-контексте</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Главная роль в публикации</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Публикации только с риск-факторами</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Включать технические новости рынков</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Включать анонсы и календари</span>
                </label>
                <label className={styles.cr_wrapper}>
                  <input type="checkbox" />
                  <div className={styles.cr_input}></div>
                  <span>Включать сводки новостей</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.form__footer}>
            <div className={styles.item__input}>
              <label>
                Диапазон поиска*:
                <div className={styles.input__date}>
                  <Calendar
                    className={styles.date__range}
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange('start', new Date(e.target.value))
                    }
                    readOnlyInput
                    hideOnRangeSelection
                    showButtonBar
                  />
                  <Calendar
                    className={styles.date__range}
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange('end', new Date(e.target.value))
                    }
                    readOnlyInput
                    hideOnRangeSelection
                    showButtonBar
                  />
                </div>
              </label>
            </div>
            <Button className={styles.form_button}>Поиск</Button>
          </div>
          <div className={styles.required}>
            <p>* Обязательные к заполнению поля</p>
          </div>
        </form>
      </div>
    </>
  );
}
