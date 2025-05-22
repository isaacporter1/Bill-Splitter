import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(0);

  const [personCount, setPersonCount] = useState(2);
  const [people, setPeople] = useState([]);

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxType, setTaxType] = useState("Amount");
  const [tip, setTip] = useState(0);
  const [tipType, setTipType] = useState("Amount");

  const [error, setError] = useState('');


  const placeholderNames = ["Sung Jinwoo", "Isagi Yoichi", "Goku",
    "Kageyama Goat", "Satoru Gojo", "Yuji Itadori",
    "Toji Fushiguro", "Nagi Seishiro"];

  const handleReset = () => {

    setPersonCount(2);
    setPeople([]);
    setTax(0);
    setTip(0);
  }

  const handlePersonCountChange = (e) => {
    const count = Number(e.target.value);
    if (count < 2 || count > 20) {
      setError('Please enter a number between 2 and 20');
    } else {
      setError(''); // Clear the error if valid
    }
    setPersonCount(count);
  };

  return (
    <>
      {state !== 0 && (
        <div className="absolute top-4 left-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => {
              state !== 1 ? setState(1) : setState(0);
              handleReset();
            }}
          >
            Reset
          </button>
        </div>
      )}


      {state == 0 && (
        <div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            onClick={() => setState(1)}>
            Start Splittin the Bill ????? :D
          </button>
        </div>
      )}

      {/* {state == 1 && (
        <div>
          What is the Sub Total? $<input id="subTotalAmount" type="number" step="0.01" placeholder="0.00"
            value={subTotal}
            onChange={(e) => setSubTotal(Number(e.target.value))} />
          <button
            onClick={() => { setState(2); }}
          >
            Confirm
          </button>
        </div>
      )} */}

      {state == 1 && (
        <>
          <div className="flex items-center space-x-3">
            <span className="text-white">
              How many people are you splitting the bill with?
            </span>
            <input
              className="border-b border-white bg-transparent text-white focus:outline-none px-2 py-1"
              id="personCount"
              type="number"
              min="2"
              max="20"
              step="1"
              value={personCount}
              onChange={handlePersonCountChange}
            />

            <button
              className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                const initialPeople = Array.from({ length: personCount }, () => ({
                  name: '',
                  subtotal: 0,
                  total: 0,
                }));
                setPeople(initialPeople);
                setState(2);
              }}
              disabled={personCount < 2 || personCount > 20}
            >
              Confirm
            </button>

          </div>
          <div className='px-2'>{error && <span className="text-red-500">{error}</span>} {/* Error message */}</div>
        </>
      )}

      {state === 2 && (
        <div>
          {people.map((person, index) => (
            <div key={index} style={{ marginTop: "15px" }}>
              Person {index + 1} Name:{' '}
              <input className="border border-white rounded px-2 py-1 text-white"
                type="text"
                placeholder={placeholderNames[index] || `Person ${index + 1}`}
                value={person.name}
                onChange={(e) => {
                  //is this being called any time the name is changed by one letter? Add a console log to see it spamming updates, maybe thats normal tho
                  const updated = [...people];
                  updated[index].name = e.target.value;
                  setPeople(updated);
                }}
              />
              {' '}– SubTotal:{' '}${' '}
              <input className="border border-white rounded px-2 py-1 text-white"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={person.subtotal}
                onChange={(e) => {
                  //same here ^^
                  const updated = [...people];
                  updated[index].subtotal = parseFloat(e.target.value || 0);
                  setPeople(updated);
                }}
              />
            </div>
          ))}
          <div style={{ marginTop: "15px" }}>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              onClick={() => {
                setState(3)

                // Ensure each person's name is not empty; if it is, set it to the placeholder name
                const updatedPeople = people.map((person, index) => ({
                  ...person,
                  name: person.name === "" ? placeholderNames[index] : person.name
                }));

                // Update the people array with the fixed names
                setPeople(updatedPeople);

                const totalSub = people.reduce((acc, person) => acc + person.subtotal, 0);
                //check how this method is used usually
                setSubTotal(totalSub);
              }}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {state == 3 && (
        <div className="flex items-center space-x-4">
          Total Tax: $<input className="border-b border-white bg-transparent text-white focus:outline-none px-2 py-1"
            id="taxAmount" type="number" step="0.01" placeholder="0.00"
            onChange={(e) => { setTax(Number(e.target.value)); }}
          />
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            onClick={() => setState(4)}>
            Confirm
          </button>
        </div>
      )}

      {state == 4 && (
        <div className="flex items-center space-x-4">
          Total Tip: $<input className="border-b border-white bg-transparent text-white focus:outline-none px-2 py-1"
            id="tipAmount" type="number" step="0.01" placeholder="0.00"
            onChange={(e) => { setTip(Number(e.target.value)); }}
          />
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            onClick={() => {
              setState(5)

            }}
          >
            Confirm
          </button>
        </div>
      )}

      {state == 5 && (
        <div>
          <div className="font-bold text-xl" style={{ marginTop: "15px" }}>With a Sub Total of: ${subTotal.toFixed(2)}</div>
          <div className="font-bold text-xl" style={{ marginTop: "15px" }}>A Tax Amount of: ${tax.toFixed(2)}</div>
          <div className="font-bold text-xl" style={{ marginTop: "15px" }}>And a Tip of: ${tip.toFixed(2)}</div>

          {people.map((person, index) => {
            const personTotal = person.subtotal + (person.subtotal / subTotal) * (tax + tip);

            return (
              <div className="font-bold text-xl" key={index} style={{ marginTop: "15px" }}>
                {person.name}'s Total:{' '}${personTotal.toFixed(2)}
              </div>
            );
          })}

          <div className="font-bold text-2xl mt-12 border-3 border-white rounded bg-transparent text-white focus:outline-none px-4 py-2" >
            For a Total of: ${(Number(subTotal) + tax + tip).toFixed(2)}
          </div>

          {/* <button
            onClick={() => setState(5)}>
            Confirm
          </button> */}
        </div>
      )}
    </>
  )
}

export default App
