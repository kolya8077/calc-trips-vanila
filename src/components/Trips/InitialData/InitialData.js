
export const InitialData = ({
  perDiem,
  setPerDiem,
  day,
  setDay,
  nigth,
  setNigth,
}) => {
  // const [perDiem, setPerDiem] = useState(0);
  // const [day, setDay] = useState(0);
  // const [nigth, setNigth] = useState(0);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit({
  //     perDiem: perDiem,
  //     day: day,
  //     nigth: nigth,
  //   });
  // };

  return (
    <>
      <h2>Збір початкових даних</h2>
      <form>
        <label>
          <p>Замовлення коштів на 1 ніч:</p>
          <input
            type="number"
            name="perDiem"
            value={perDiem}
            onChange={(e) => {
              setPerDiem(Number(e.target.value));
            }}
          />
        </label>
        <label>
          <p>Кількість днів:</p>
          <input
            type="number"
            name="day"
            value={day}
            onChange={(e) => {
              setDay(Number(e.target.value));
            }}
          />
        </label>
        <label>
          <p>Кількість ночей:</p>
          <input
            type="number"
            name="nigth"
            value={nigth}
            onChange={(e) => {
              setNigth(Number(e.target.value));
            }}
          />
        </label>
      </form>
    </>
  );
};
