export const InitialData = ({
  perDiem,
  setPerDiem,
  day,
  setDay,
  nigth,
  setNigth,
}) => {

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
              const value =
                e.target.value.trim() !== "" ? Number(e.target.value) : "";
              setPerDiem(value);
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
              const value =
                e.target.value.trim() !== "" ? Number(e.target.value) : "";
              setDay(value);
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
              const value =
                e.target.value.trim() !== "" ? Number(e.target.value) : "";
              setNigth(value);
            }}
          />
        </label>
      </form>
    </>
  );
};
