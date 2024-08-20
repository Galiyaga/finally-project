import React from "react";
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
    return (
        <>
            <div className={styles.search__container}>
                <h1 className={styles.searh__title}>
                    Найдите необходимые данные в пару кликов.
                </h1>
                <p className={styles.search__about}></p>
                <div className={styles.form__container}>

                </div>
            </div>
        </>
    )
}