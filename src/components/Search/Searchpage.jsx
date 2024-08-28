import React, { useState } from "react";
import styles from "./Searchpage.module.css";
import axios from "axios";
import { Button } from "../Button";
import {Calendar } from "primereact/calendar";
import { addLocale } from  "primereact/api";
import { useNavigate } from "react-router-dom";

import { selectAccessToken } from "../context/authSlice"
import { useSelector, useDispatch } from "react-redux";
import { setStoreData, clearStoreData } from "../context/dataSlice";

addLocale('es', {
  today: 'Сегодня',
  clear: 'Очистить',
  monthNames: ['Январь ', 'Февраль ', 'Март ', 'Апрель ', 'Май ', 'Июнь ', 'Июль ', 'Август ', 'Сентябрь ', 'Октябрь ', 'Ноябрь ', 'Декабрь '],
  monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
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
  const [inn, setInn] = useState("7710137066");
  const [innError, setInnError] = useState("");
  const [tonality, setTonality] = useState("Любая");
  const [documentsCount, setDocumentsCount] = useState("");
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [error, setError] = useState({start: '', end: ''})

  const [maxFullness, setMaxFullness] = useState(true);
  const [inBusinessNews, setInBusinessNews] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(true);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(null);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(true);
  const [excludeDigests, setExcludeDigests] = useState(true);

  const token = useSelector(selectAccessToken)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [data, setData] = useState(null)

  const handleInnChange = (e) => {
    setInn(e.target.value);
      const { result, error } = validateInn(e.target.value);
      if (!result) {
        setInnError(error.message);
      } else {
        setInnError("");
      }
  };

  const resetTime = (date) =>{
    const newDate = new Date(date)
    newDate.setHours(0,0,0,0)
    return newDate
  }

  const checkDates = (start, end) => {
    const now = resetTime(new Date())
    const startDate = resetTime(start)
    const endDate = resetTime(end)
    let newError = { ...error }; 

    if (startDate > now) {
      newError.start = "Первая дата не должна быть в будущем";
    } else if (!error.start.includes("Первая дата не должна быть больше второй.")) {
      newError.start = ""; 
    }

    if (endDate > now) {
      newError.end = "Вторая дата не должна быть в будущем";
    } else {
      newError.end = "";
    }

    if (startDate > endDate) {
      newError.start = "Первая дата не должна быть больше второй.";
      newError.end = "";
    }

    setError(newError); 
    return !newError.start && !newError.end; 
};


  const handleChangeDate = (type, value) => {
    const updateDate = {...dateRange, [type]: value}
    if(checkDates(updateDate.start, updateDate.end)) {
      setDateRange(updateDate)
    }
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    const formatDate = (date, start) => {
      return new Date(start ? date.setHours(0, 0, 0) : date.setHours(23, 59, 59));
    }






    const formattedTonality = tonality.toLowerCase() === 'негативная' ? 'negative' :
                              tonality.toLowerCase() === 'позитивная' ? 'positive' :
                              tonality.toLowerCase() === 'любая' ? 'any' : 'neutral';
    const requestData = {
      "issueDateInterval": {
        "startDate": formatDate(dateRange.start, true),
        "endDate": formatDate(dateRange.end)
      },
      "searchContext": {
        "targetSearchEntitiesContext": {
          "targetSearchEntities": [
            {
              "type": "company",
              "sparkId": null,
              "entityId": null,
              "inn": inn,
              "maxFullness": null,
              "inBusinessNews": null
            }
          ],
          "onlyMainRole": onlyMainRole,
          "tonality": formattedTonality,
          "onlyWithRiskFactors": onlyWithRiskFactors,
          "riskFactors": {
            "and": [],
            "or": [],
            "not": []
          },
          "themes": {
            "and": [],
            "or": [],
            "not": []
          }
        },
        "themesFilter": {
          "and": [],
          "or": [],
          "not": []
        }
      },
      "searchArea": {
        "includedSources": [],
        "excludedSources": [],
        "includedSourceGroups": [],
        "excludedSourceGroups": []
      },
      "attributeFilters": {
        "excludeTechNews": null,
        "excludeAnnouncements": null,
        "excludeDigests": null
      },
      "similarMode": "duplicates",
      "limit": parseInt(documentsCount, 10),
      "sortType": "sourceInfluence",
      "sortDirectionType": "desc",
      "intervalType": "month",
      "histogramTypes": [
        "totalDocuments",
        "riskFactors"
      ]
    }

    const simulatedData = [
      {
        data: [
          { date: "2020-11-01T03:00:00+03:00", value: 8 },
          { date: "2020-06-01T03:00:00+03:00", value: 6 },
        ],
        histogramType: "totalDocuments",
      },
      {
        data: [
          { date: "2020-11-01T03:00:00+03:00", value: 0 },
          { date: "2020-06-01T03:00:00+03:00", value: 1 },
        ],
        histogramType: "riskFactors",
      },
      {
        data: [
          { date: "2021-10-29T03:00:00+03:00", value: 5 },
          { date: "2021-08-21T03:00:00+03:00", value: 3 },
        ],
        histogramType: "totalDocuments",
      },
      {
        data: [
          { date: "2021-10-29T03:00:00+03:00", value: 5 },
          { date: "2021-08-21T03:00:00+03:00", value: 3 },
        ],
        histogramType: "riskFactors",
      },
      {
        data: [
          { date: "2023-05-10T03:00:00+03:00", value: 7 },
          { date: "2023-12-14T03:00:00+03:00", value: 0 },
        ],
        histogramType: "totalDocuments",
      },
      {
        data: [
          { date: "2023-05-10T03:00:00+03:00", value: 7 },
          { date: "2023-12-14T03:00:00+03:00", value: 0 },
        ],
        histogramType: "riskFactors",
      },
    ];

    const handleClearData = () => {
      dispatch(clearStoreData());
    };

    // const formattedData = formatMockData(simulatedData)

    try {
      const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', requestData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('one: ', formatMockData(response.data.data))
      console.log('two: ', formatMockData(simulatedData))

      if (response.data.data.length) {  
        const formattedData = formatMockData(response.data.data)
        setData(formattedData)

        console.log('formattedData: ', formattedData)

        dispatch(
          setStoreData({
            data: formattedData,
            previousRequest: requestData ,
          })
        );
        
      } else {
        console.log('Вернулся пустой массив, используем моковые данные в сводке')
        const mockData = formatMockData(simulatedData)
        setData(mockData)

        dispatch(
          setStoreData({
            data: mockData,
            previousRequest: requestData ,
          })
        );
      }
      navigate('/rezult')
    } catch (error) {
      console.log('Ошибка запроса: ', error)
    }
  }


  function formatMockData(simulatedData) {
    const formattedData = {};
  
    simulatedData.forEach((item) => {
      item.data.forEach((entry) => {
        const date = entry.date;
        const value = entry.value;
        
        if (!formattedData[date]) {
          formattedData[date] = { 
            date: new Date(date).toLocaleDateString("ru-RU"), 
            total: 0, 
            risk: 0 };
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
                  {innError && <div className={styles.error}>{innError}</div>}
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
                    onChange={(e) => setOnlyWithRiskFactors(e.target.checked)}
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
                    onChange={(e) => setExcludeAnnouncements(e.target.checked)}
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
                      readOnlyInput
                      hideOnRangeSelection
                      showButtonBar
                      required
                      locale="es"
                      variant="filled"
                      dateFormat="dd/mm/yy"
                    />
                    {error.start && (
                      <div className={styles.error__text}>{error.start}</div>
                    )}
                  </div>
                  <div className={styles.calendar__wrapper}>
                    <Calendar
                      value={dateRange.end}
                      onChange={(e) =>
                        handleChangeDate("end", new Date(e.target.value))
                      }
                      readOnlyInput
                      hideOnRangeSelection
                      showButtonBar
                      required
                      locale="es"
                      variant="filled"
                      dateFormat="dd/mm/yy"
                    />
                    {error.end && (
                      <div className={styles.error__text}>{error.end}</div>
                    )}
                  </div>
                </div>
              </label>
            </div>
            <Button
              className={styles.form_button}
              disabled={
                !dateRange.start || !dateRange.end || !documentsCount || !inn
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
    </>
  );}