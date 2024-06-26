import { useEffect, useState } from "react";
import { HotelForm } from "./HotelForm/HotelForm";
import { InitialData } from "./InitialData/InitialData";
import DownloadButton from "./DownloadButton/DownloadButton";

export const Trips = () => {
  const [perDiem, setPerDiem] = useState(0);
  const [day, setDay] = useState(0);
  const [nigth, setNigth] = useState(0);

  const [stateForm, setStateForm] = useState([]);
  const [totalHotel, setTotalHotel] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const [fileDescription, setFileDescription] = useState("");

  const piecework = 350;

  const sumPerDiem = perDiem * nigth;
  const sumPiecework = piecework * day;

  useEffect(() => {
    const totalSumHotel = () => {
      const updatedTotalHotel = stateForm.map((form, index) => {
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

        return {
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
      });

      setTotalHotel(updatedTotalHotel);
    };

    totalSumHotel();
  }, [stateForm, perDiem, day, nigth]);

  useEffect(() => {
    let total_cur = 0;
    let money = 0;
    let totalWorkers_cur = 0;

    totalHotel.forEach((form) => {
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
  }, [totalHotel]);

  const { total_cur, money } = totalMoney;
  console.log(stateForm)
  useEffect(() => {
    // Оновлення fileDescription залежно від потрібних даних
    // const updatedDescription = "Короткий опис для файлу.txt";
    const updatedDescription = `
Замовлення коштів на 1 ніч: ${perDiem}
Кількість днів: ${day}
Кількість ночей: ${nigth}
${stateForm.map(
  (form, index) => `

Готель ${index + 1}
ніч: ${form.accommodation}
парковка: ${form.parking}
ночей: ${form.nighttime}
працівники: ${form.workers}
папери: ${form.documents}
відсотки: ${form.interest}
загалом з одного: ${(() => {
    const baseValue =
      form.documents * form.nighttime -
      (form.accommodation * form.nighttime) / form.workers;
    const percentageValue = (baseValue / 100) * form.interest;
    const residence = (form.accommodation * form.nighttime) / form.workers;
    const result = percentageValue + residence;
    return result;
  })()}
загалом з усіх: ${(() => {
    const baseValue =
      form.documents * form.nighttime -
      (form.accommodation * form.nighttime) / form.workers;
    const percentageValue = (baseValue / 100) * form.interest;
    const residence = (form.accommodation * form.nighttime) / form.workers;
    const result = (percentageValue + residence) * form.workers;
    return result;
  })()}
`
)}
Підсумок!

Замовили гроші на готель: ${sumPerDiem}
Відрядні: ${sumPiecework}
Загальна сума відрядних: ${sumPerDiem + sumPiecework}
Загальні витрати: ${total_cur}
Загальна сума відрядних: ${money + sumPiecework}

Доплата: ${money - sumPerDiem}
Дохід: ${money + sumPiecework - total_cur}
`;
    setFileDescription(updatedDescription);
  }, [day, money, nigth, perDiem, stateForm, sumPerDiem, sumPiecework, total_cur]);


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
      <p>Замовили гроші на готель: {sumPerDiem}</p>
      <p>Відрядні: {sumPiecework}</p>
      <p>Загальна сума відрядних: {sumPerDiem + sumPiecework}</p>
      <p>Загальні витрати: {total_cur}</p>
      <p>Загальна сума відрядних: {money + sumPiecework}</p>
      <p>Доплата: {money - sumPerDiem}</p>
      <p>Дохід: {money + sumPiecework - total_cur}</p>

      <DownloadButton description={fileDescription} />
    </>
  );
};
