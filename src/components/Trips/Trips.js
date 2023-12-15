import { useEffect, useState, useRef } from 'react';
import { HotelForm } from './HotelForm/HotelForm';
import { InitialData } from './InitialData/InitialData';
import DownloadButton from './DownloadButton/DownloadButton';

export const Trips = () => {
  const [perDiem, setPerDiem] = useState(0);
  const [day, setDay] = useState(0);
  const [nigth, setNigth] = useState(0);

  const [stateForm, setStateForm] = useState([]);
  // const [totalHotel, setTotalHotel] = useState([]);
  const totalHotelRef = useRef([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const [fileDescription, setFileDescription] = useState('');

  const piecework = 350;

  const sumPerDiem = perDiem * nigth;
  const sumPiecework = piecework * day;

  useEffect(() => {
    const totalSumHotel = () => {
      stateForm.map((form, index) => {
        const {
          accommodation,
          parking,
          nighttime,
          workers,
          documents,
          interest,
        } = form;

        let total = 0;
        let totalWorkers = 0;

        if (accommodation) {
          total =
            ((documents * nighttime - (accommodation * nighttime) / workers) /
              100) *
            interest;
          totalWorkers = (accommodation * nighttime) / workers + total;
          total += (accommodation * nighttime) / workers;
          totalWorkers *= workers;
        } else {
          total = ((documents * nighttime) / 100) * interest;
          totalWorkers = total * workers;
        }

        if (parking) {
          total += (parking * nighttime) / workers;
          totalWorkers += parking * nighttime;
        }

        const existingIndex = totalHotelRef.current.findIndex(
          item => item.index === index
        );

        if (existingIndex !== -1) {
          totalHotelRef.current[existingIndex] = {
            accommodation,
            parking,
            nighttime,
            workers,
            documents,
            interest,
            total,
            totalWorkers,
            index,
          };
        } else {
          totalHotelRef.current.push({
            accommodation,
            parking,
            nighttime,
            workers,
            documents,
            interest,
            total,
            totalWorkers,
            index,
          });
        }
        return totalWorkers;
      });

      totalHotelRef.current = [...totalHotelRef.current];
    };
    totalSumHotel();
  }, [stateForm, perDiem, day, nigth]);

  useEffect(() => {
    let total_cur = 0;
    let money = 0;
    let totalWorkers_cur = 0;

    totalHotelRef.current.forEach(form => {
      const { total, documents, nighttime, totalWorkers } = form;
      total_cur += total;
      money += documents * nighttime;
      totalWorkers_cur += totalWorkers;
    });

    setTotalMoney({
      total_cur: total_cur,
      money: money,
      totalWorkers_cur: totalWorkers_cur,
    });
  }, [totalHotelRef]);

  useEffect(() => {
    // Оновлення fileDescription залежно від потрібних даних
    const updatedDescription = 'Короткий опис для файлу.txt';
    setFileDescription(updatedDescription);
  }, []);

  const { total_cur, money } = totalMoney;

  return (
    <>
      <InitialData
        perDiem={perDiem}
        setPerDiem={setPerDiem}
        day={day}
        setDay={setDay}
        nigth={nigth}
        setNigth={setNigth}
      />
      <HotelForm stateForm={stateForm} setStateForm={setStateForm} />
      <p>Замовили гроши на готель: {sumPerDiem}</p>
      <p>Відрядні: {sumPiecework}</p>
      <p>Загальна сума відрядних: {sumPerDiem + sumPiecework}</p>
      <p>Загальні витрати: {total_cur}</p>
      <p>Загальна сумма відрядних: {money + sumPiecework}</p>
      <p>Доплата: {money - sumPerDiem}</p>
      <p>Дохід: {money + sumPiecework - total_cur}</p>

      <DownloadButton description={fileDescription} />
    </>
  );
};
