import React, {useState} from "react";
import styles from "./Searchpage.module.css"

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
        return parseInt(n % 11 % 10);
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
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    
    const handleInnChange = (e) => {
      setInn(e.target.value);
    //   const { result, error } = validateInn(e.target.value);
    //   if (!result) {
    //     setInnError(error.message);
    //   } else {
    //     setInnError("");
    //   }
    };
    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log({ inn, tonality, documentsCount, dateRange });
    };
    return (
        <>
            <div className={styles.search__container}>
                <h1 className={styles.searh__title}>
                    Найдите необходимые данные в пару кликов.
                </h1>
                <p className={styles.search__about}></p>
                <form onSubmit={handleFormSubmit} className={styles.search__form}>
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

                        <div className={styles.item__input}>
                            <label>
                                Диапазон поиска*:
                                <div className={styles.input__date}>
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) =>
                                        setDateRange({ ...dateRange, start: e.target.value })
                                        }
                                    />
                                </div>
                            </label>
                        </div>

                        <div className={styles.item__input}>
                            <label>
                                Диапазон поиска*:
                                <div className={styles.input__date}>
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) =>
                                        setDateRange({ ...dateRange, end: e.target.value })
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                     <div className={styles.form__checkbox}>
                        <div>
                            <label>
                                <input type="checkbox" />
                                Признак максимальной полноты
                            </label>
                            <label>
                                <input type="checkbox" />
                                Упоминания в бизнес-контексте
                            </label>
                            <label>
                                <input type="checkbox" />
                                Главная роль в публикации
                            </label>
                            <label>
                                <input type="checkbox" />
                                Публикации только с риск-факторами
                            </label>
                            <label>
                                <input type="checkbox" />
                                Включать технические новости рынков
                            </label>
                            <label>
                                <input type="checkbox" />
                                Включать анонсы и календари
                            </label>
                            <label>
                                <input type="checkbox" />
                                Включать сводки новостей
                            </label>
                        </div>
                        <button type="submit">Поиск</button>
                    </div>               
                </form>
            </div>
        </>
    )
}