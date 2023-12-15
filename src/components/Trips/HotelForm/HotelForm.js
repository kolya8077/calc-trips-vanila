// import { useState } from "react";

export const HotelForm = ({ stateForm, setStateForm }) => {
  // const [accommodation, setAccommodation] = useState(0);
  // const [parking, setParking] = useState(0);
  // const [nighttime, setNighttime] = useState(0);
  // const [workers, setWorkers] = useState(0);
  // const [documents, setDocuments] = useState(0);
  // const [interest, setInterest] = useState(0);
  // const [total, setTotal] = useState(0);
  // const [totalWorkers, setTotalWorkers] = useState(0);
  // const [stateForm, setStateForm] = useState([]);

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
    updatedForms[index][field] = Number(value);
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
        </div>
      ))}
      <button onClick={() => setStateForm([...stateForm, addForm])}>
        Додати форму
      </button>
    </>
  );
};
