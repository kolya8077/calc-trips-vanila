export const HotelForm = ({ stateForm, setStateForm }) => {
  const addForm = {
    accommodation: 0,
    parking: 0,
    nighttime: 0,
    workers: 0,
    documents: 0,
    interest: 0,
  };

  const handleChange = (index, field, value) => {
    const updatedForms = [...stateForm];
    updatedForms[index][field] = value.trim() !== "" ? parseFloat(value) : "";
    setStateForm(updatedForms);
  };

  return (
    <>
      {stateForm.map((form, index) => (
        <div key={index}>
          <h3>Готель {index + 1}</h3>
          <form>
            <label>
              <p>Ніч:</p>
              <input
                type="number"
                name="accommodation"
                value={form.accommodation}
                onChange={(e) =>
                  handleChange(index, "accommodation", e.target.value)
                }
              />
            </label>
            <label>
              <p>Парковка:</p>
              <input
                type="number"
                name="parking"
                value={form.parking}
                onChange={(e) => handleChange(index, "parking", e.target.value)}
              />
            </label>
            <label>
              <p>Кількість ночей:</p>
              <input
                type="number"
                name="nighttime"
                value={form.nighttime}
                onChange={(e) =>
                  handleChange(index, "nighttime", e.target.value)
                }
              />
            </label>
            <label>
              <p>Працівники:</p>
              <input
                type="number"
                name="workers"
                value={form.workers}
                onChange={(e) => handleChange(index, "workers", e.target.value)}
              />
            </label>
            <label>
              <p>Документи:</p>
              <input
                type="number"
                name="documents"
                value={form.documents}
                onChange={(e) =>
                  handleChange(index, "documents", e.target.value)
                }
              />
            </label>
            <label>
              <p>Відсотки:</p>
              <input
                type="number"
                name="interest"
                value={form.interest}
                onChange={(e) =>
                  handleChange(index, "interest", e.target.value)
                }
              />
            </label>
          </form>
          {/* <p>
            Відсотки:{" "}
            {((form.documents * form.nighttime) - (form.accommodation * form.nighttime) / form.workers) / 100) * form.interest}
          </p> */}
          <p>
            Відсотки:{" "}
            {(() => {
              const baseValue =
                form.documents * form.nighttime -
                (form.accommodation * form.nighttime) / form.workers;
              const percentageValue = (baseValue / 100) * form.interest;
              return percentageValue;
            })()}
          </p>
          <p>
            Проживання:{" "}
            {(() => {
              const residence =
                (form.accommodation * form.nighttime) / form.workers;
              return residence;
            })()}
          </p>
          <p>
            Загальна ціна з одного з відсотками:{" "}
            {(() => {
              const baseValue =
                form.documents * form.nighttime -
                (form.accommodation * form.nighttime) / form.workers;
              const percentageValue = (baseValue / 100) * form.interest;
              const residence =
                (form.accommodation * form.nighttime) / form.workers;
              const result = percentageValue + residence;
              return result;
            })()}
          </p>
          <p>Загальна ціна з всіх з відсотками: {(() => {
                          const baseValue =
                            form.documents * form.nighttime -
                            (form.accommodation * form.nighttime) /
                              form.workers;
                          const percentageValue =
                            (baseValue / 100) * form.interest;
                          const residence =
                            (form.accommodation * form.nighttime) /
                            form.workers;
                          const result = (percentageValue + residence) * form.workers;
                          return result;
          })()}</p>
          <p>Парковка: {(form.nighttime * form.parking) / form.workers}</p>
        </div>
      ))}
      <button onClick={() => setStateForm([...stateForm, addForm])}>
        Додати форму
      </button>
    </>
  );
};
