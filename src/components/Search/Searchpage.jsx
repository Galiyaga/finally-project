import React, { useState } from "react";
import styles from "./Searchpage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";
import { selectAccessToken } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setStoreData, clearStoreData } from "../store/dataSlice";
import { classNames } from "primereact/utils";

addLocale("es", {
  today: "Сегодня",
  clear: "Очистить",
  monthNames: [
    "Январь ",
    "Февраль ",
    "Март ",
    "Апрель ",
    "Май ",
    "Июнь ",
    "Июль ",
    "Август ",
    "Сентябрь ",
    "Октябрь ",
    "Ноябрь ",
    "Декабрь ",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сент",
    "Окт",
    "Нояб",
    "Дек",
  ],
});

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
  // TODO: удалить дефолтное значение
  // Состояния полей и чекбоксов
  const [inn, setInn] = useState("7710137066");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [tonality, setTonality] = useState("Любая");
  const [documentsCount, setDocumentsCount] = useState("");
  const [maxFullness, setMaxFullness] = useState(true);
  const [inBusinessNews, setInBusinessNews] = useState(true);
  const [onlyMainRole, setOnlyMainRole] = useState(true);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(false);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(true);
  const [excludeDigests, setExcludeDigests] = useState(false);
  const [innError, setInnError] = useState("");
  const [errorDate, setErrorDate] = useState({ start: "", end: "" });

  const token = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInnChange = (e) => {
    setInn(e.target.value);
    const { result, error } = validateInn(e.target.value);
    if (!result) {
      setInnError(error.message);
    } else {
      setInnError("");
    }
  };

  // Валидация даты
  const setTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const checkDates = (start, end) => {
    const now = setTime(new Date());
    const startDate = setTime(start);
    const endDate = setTime(end);
    let newError = { ...errorDate };

    console.log('start: ', start)
    console.log('end: ', end)

    if (startDate > now) {
      newError.start = "Первая дата не должна быть в будущем";
    } else if (
      !errorDate.start.includes("Первая дата не должна быть больше второй.")
    ) {
      newError.start = "";
    }

    if (endDate > now) {
      newError.end = "Вторая дата не должна быть в будущем";
    } else {
      newError.end = "";
    }

    if (end && startDate > endDate) {
      newError.start = "Первая дата не должна быть больше второй.";
      newError.end = "";
    } else if (newError.start !== "Первая дата не должна быть в будущем") {
      newError.start = "";
    }

    setErrorDate(newError);
    return !newError.start && !newError.end;
  };

  // Сохранение даты в состояние
  const handleChangeDate = (type, value) => {
    console.log('type: ', type)
    console.log('value: ', value)
    const updateDate = { ...dateRange, [type]: value };
    if (checkDates(updateDate.start, updateDate.end)) {
      setDateRange(updateDate);
    }

    console.log('dateRange: ', dateRange)
  };

  // Функция отправки формы
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Форматируем дату, полученную с инпутов
    const formatDateTime = (date, start) => {
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);

      return start
        ? `${year}-${month}-${day}T00:00:00+03:00`
        : `${year}-${month}-${day}T23:59:59+03:00`;
    };

    // Интерпретируем данные с инпута тональности
    const formattedTonality =
      tonality.toLowerCase() === "негативная"
        ? "negative"
        : tonality.toLowerCase() === "позитивная"
        ? "positive"
        : tonality.toLowerCase() === "любая"
        ? "any"
        : "neutral";

    // Данные запроса
    const requestData = {
      issueDateInterval: {
        startDate: formatDateTime(dateRange.start, true),
        endDate: formatDateTime(dateRange.end),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: inn,
              maxFullness: maxFullness,
              inBusinessNews: inBusinessNews,
            },
          ],
          onlyMainRole: onlyMainRole,
          tonality: formattedTonality,
          onlyWithRiskFactors: onlyWithRiskFactors,
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: excludeTechNews,
        excludeAnnouncements: excludeAnnouncements,
        excludeDigests: excludeDigests,
      },
      similarMode: "duplicates",
      limit: parseInt(documentsCount, 10),
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    };

    try {
      dispatch(clearStoreData());

      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data.length) {
        const formattedData = formatData(response.data.data);
        const dataCount = response.data.data.length;

        // Сохраняем в store ответ запроса и сам запрос для повторной отправки
        dispatch(
          setStoreData({
            data: formattedData,
            previousRequest: requestData,
            dataCount: dataCount,
          })
        );
      } else {
        console.log("Вернулся пустой массив");
        toast.warn(
          <div>
            Данные не найдены
            <Link
              to="/search"
              style={{
                marginLeft: "10px",
                textDecoration: "underline",
                color: "blue",
              }}
            >
              Вернуться к поиску
            </Link>
          </div>
        );
      }

      navigate("/rezult");
    } catch (error) {
      console.log("Ошибка запроса: ", error);
      toast.warn("Ошибка запроса", toastSettings);
    }
  };

  const toastSettings = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Форматируем ответ запроса для корректного вывода
  function formatData(responseData) {
    const formattedData = {};

    responseData.forEach((item) => {
      item.data.forEach((entry) => {
        const date = entry.date;
        const value = entry.value;

        if (!formattedData[date]) {
          formattedData[date] = {
            date: new Date(date).toLocaleDateString("ru-RU"),
            total: 0,
            risk: 0,
          };
        }

        if (item.histogramType === "totalDocuments") {
          formattedData[date].total = value;
        } else if (item.histogramType === "riskFactors") {
          formattedData[date].risk = value;
        }
      });
    });

    return Object.values(formattedData);
  }

  return (
    <>
      <div className={styles.search__container}>
        <h1 className={styles.search__title}>
          Найдите необходимые <br></br> данные в пару кликов.
        </h1>
        <p className={styles.search__about}>
          Задайте параметры поиска. <br></br>Чем больше заполните, тем точнее
          поиск
        </p>
        <div className={styles.search__main}>
          <div className={styles.main__form}>
            <form onSubmit={handleFormSubmit} className={styles.search__form}>
              <div className={styles.form__main}>
                <div className={styles.form__input}>
                  <div className={styles.form__input_item}>
                    <label>
                      ИНН компании*:
                      <input
                        className={
                          innError ? styles.input__error : styles.item__input
                        }
                        type="text"
                        value={inn}
                        onChange={handleInnChange}
                        placeholder="10 цифр"
                        required
                      />
                      {innError && (
                        <div className={styles.error__text}>{innError}</div>
                      )}
                    </label>
                  </div>

                  <div className={styles.form__input_item}>
                    <label>
                      Тональность:
                      <select
                        className={styles.item__input}
                        value={tonality}
                        onChange={(e) => setTonality(e.target.value)}
                      >
                        <option value="Позитивная">Позитивная</option>
                        <option value="Негативная">Негативная</option>
                        <option value="Любая">Любая</option>
                      </select>
                    </label>
                  </div>

                  <div className={styles.form__input_item}>
                    <label>
                      Количество документов в выдаче*:
                      <input
                        className={styles.item__input}
                        type="number"
                        value={documentsCount}
                        onChange={(e) => setDocumentsCount(e.target.value)}
                        min="1"
                        max="1000"
                        placeholder="От 1 до 1000"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.form__checkbox}>
                  <div className={styles.checkbox__item}>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={maxFullness}
                        onChange={(e) => setMaxFullness(e.target.checked)}
                      />
                      <div className={styles.cr_input}></div>
                      <span> Признак максимальной полноты</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={inBusinessNews}
                        onChange={(e) => setInBusinessNews(e.target.checked)}
                      />
                      <div className={styles.cr_input}></div>
                      <span>Упоминания в бизнес-контексте</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={onlyMainRole}
                        onChange={(e) => setOnlyMainRole(e.target.checked)}
                      />
                      <div className={styles.cr_input}></div>
                      <span>Главная роль в публикации</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={onlyWithRiskFactors}
                        onChange={(e) =>
                          setOnlyWithRiskFactors(e.target.checked)
                        }
                      />
                      <div className={styles.cr_input}></div>
                      <span>Публикации только с риск-факторами</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={excludeTechNews}
                        onChange={(e) => setExcludeTechNews(e.target.checked)}
                      />
                      <div className={styles.cr_input}></div>
                      <span>Включать технические новости рынков</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={excludeAnnouncements}
                        onChange={(e) =>
                          setExcludeAnnouncements(e.target.checked)
                        }
                      />
                      <div className={styles.cr_input}></div>
                      <span>Включать анонсы и календари</span>
                    </label>
                    <label className={styles.cr_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.item__input}
                        checked={excludeDigests}
                        onChange={(e) => setExcludeDigests(e.target.checked)}
                      />
                      <div className={styles.cr_input}></div>
                      <span>Включать сводки новостей</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.form__footer}>
                <div className={styles.form__input_item}>
                  <label>
                    Диапазон поиска*:
                    <div className={styles.input__date}>
                      <div className={styles.calendar__wrapper}>
                        <Calendar
                          value={dateRange.start}
                          onChange={(e) =>
                            handleChangeDate("start", new Date(e.target.value))
                          }
                          readOnlyInput={false}
                          showButtonBar
                          required
                          locale="es"
                          placeholder="дд. мм. гг."
                          dateFormat="dd.mm.yy"
                          invalid={!!errorDate.start}
                        />
                        {errorDate.start && (
                          <div className={styles.error__text}>
                            {errorDate.start}
                          </div>
                        )}
                      </div>
                      <div className={styles.calendar__wrapper}>
                        <Calendar
                          value={dateRange.end}
                          onChange={(e) =>
                            handleChangeDate("end", new Date(e.target.value))
                          }
                          readOnlyInput={false}
                          showButtonBar
                          required
                          locale="es"
                          placeholder="дд. мм. гг."
                          dateFormat="dd.mm.yy"
                          invalid={!!errorDate.end}
                        />
                        {errorDate.end && (
                          <div className={styles.error__text}>
                            {errorDate.end}
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
                <Button
                  className={styles.form_button}
                  disabled={
                    !dateRange.start ||
                    !dateRange.end ||
                    !documentsCount ||
                    !inn
                  }
                >
                  Поиск
                </Button>
              </div>
              <div className={styles.required}>
                <p>* Обязательные к заполнению поля</p>
              </div>
            </form>
          </div>
          <div className={styles.main__imgs}>
            <img
              className={styles.imgs__document}
              src="src\assets\Document.svg"
              alt="Файл"
            ></img>
            <img
              className={styles.imgs__folders}
              src="src\assets\Folders.svg"
              alt="Папки"
            ></img>
            <img
              className={styles.imgs__rocket}
              src="src\assets\rocket.svg"
              alt="Ракета"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
