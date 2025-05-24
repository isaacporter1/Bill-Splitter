import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(0);

  const [personCount, setPersonCount] = useState(2);
  const [people, setPeople] = useState([]);

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState('');
  const [taxType, setTaxType] = useState("Amount");
  const [tip, setTip] = useState('');
  const [tipType, setTipType] = useState("Amount");

  const [error, setError] = useState('');


  const placeholderNames = ["Sung Jinwoo", "Isagi Yoichi", "Goku",
    "Kageyama Goat", "Satoru Gojo", "Yuji Itadori",
    "Toji Fushiguro", "Nagi Seishiro"];

  const handleReset = () => {

    setPersonCount(2);
    setPeople([]);
    setTax('');
    setTip('');
    setError('');
  }

  const handlePersonCountChange = (e) => {
    const count = Number(e.target.value);
    if (count < 2 || count > 10) {
      setError('Please enter a number between 2 and 10');
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
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          {/* Wrapper for main content and error message */}
          <div className="relative">
            {/* Main content */}
            <div className="flex items-center space-x-3">
              <span className="text-white">
                How many people are you splitting the bill with?
              </span>
              <input
                className="border-b border-white bg-transparent text-white focus:outline-none px-2 py-1 w-9 text-center"
                id="personCount"
                type="text"
                value={personCount}
                onChange={handlePersonCountChange}
              />
              <button
                className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  const initialPeople = Array.from({ length: personCount }, () => ({
                    name: '',
                    subtotal: '',
                    total: '',
                  }));
                  setPeople(initialPeople);
                  setState(2);
                }}
                disabled={personCount < 2 || personCount > 20}
              >
                Confirm
              </button>
            </div>

            {/* Error message positioned below main content */}
            {error && (
              <div className="absolute left-0 w-full mt-2 text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
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
                type="text"
                placeholder="0.00"
                value={person.subtotal}
                //value={person.subtotal === 0 ? "" : person.subtotal}
                onChange={(e) => {
                  //same here ^^
                  const val = e.target.value;

                  if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
                    const updated = [...people];
                    updated[index].subtotal = val;
                    setPeople(updated);
                  }

                  //   if (val === "") {
                  //     const updated = [...people];
                  //     updated[index].subtotal = "";
                  //     setPeople(updated);
                  //     setError(false);
                  //     return;
                  //   }

                  //   const parsed = parseFloat(val);

                  //   if (parsed < 0) {
                  //     setError(true);
                  //     return;
                  //   }

                  //   setError(false);
                  //   const updated = [...people];
                  //   updated[index].subtotal = parsed;
                  //   setPeople(updated);
                }}
              />
            </div>
          ))}
          <div style={{ marginTop: "15px" }}>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              onClick={() => {

                const unpaidIndex = people.findIndex(
                  (person) => Number(person.subtotal) === 0 || person.subtotal === ""
                );

                if (unpaidIndex !== -1) {
                  const unpaidPerson = people[unpaidIndex];
                  setError(`Why is ${unpaidPerson.name || placeholderNames[unpaidIndex] || `Person ${index + 1}`} here if they didn't pay jack s***?`);
                  return; // Stop the function from continuing
                }
                else {
                  setError('');
                }

                // Ensure each person's name is not empty; if it is, set it to the placeholder name
                const updatedPeople = people.map((person, index) => ({
                  ...person,
                  name: person.name !== "" ? person.name : placeholderNames[index] || `Person ${index + 1}`
                }));

                // Update the people array with the fixed names
                setPeople(updatedPeople);

                const totalSub = people.reduce((acc, person) => acc + Number(person.subtotal), 0);
                //check how this method is used usually
                setSubTotal(totalSub);
                setState(3)
              }}>
              Confirm
            </button>
          </div>
          {error && (
            <div className="absolute left-0 w-full mt-2 text-red-500 text-center">
              {error}
            </div>
          )}
        </div>
      )}

      {state == 3 && (
        <div className="flex items-center space-x-4">
          Total Tax: $<input className="border-b border-white bg-transparent text-white focus:outline-none px-2 py-1"
            id="taxAmount" type="text" placeholder="0.00" value={tax}
            onChange={(e) => {
              // setTax(Number(e.target.value));
              const val = e.target.value;

              if (/^\d*\.?\d{0,2}$/.test(val) || val === "") {
                setTax(val);
              }
            }}
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
            id="tipAmount" type="text" placeholder="0.00" value={tip}
            onChange={(e) => {
              //setTip(Number(e.target.value));
              const val = e.target.value;

              if (/^\d*\.?\d{0,2}$/.test(val)) {
                setTip(val);
              }
            }}
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
          <div className="font-bold text-xl" style={{ marginTop: "15px" }}>A Tax Amount of: ${Number(tax).toFixed(2)}</div>
          <div className="font-bold text-xl mb-8" style={{ marginTop: "15px" }}>And a Tip of: ${Number(tip).toFixed(2)}</div>

          {people.map((person, index) => {
            const personSub = Number(person.subtotal);
            const personTotal = personSub + (personSub / subTotal) * (Number(tax) + Number(tip));

            return (
              <div className="font-bold text-xl" key={index} style={{ marginTop: "15px" }}>
                {person.name}'s Total:{' '}${personTotal.toFixed(2)}
              </div>
            );
          })}

          <div className="font-bold text-2xl mt-12 border-3 border-white rounded bg-transparent text-white focus:outline-none px-4 py-2" >
            For a Total of: ${(Number(subTotal) + Number(tax) + Number(tip)).toFixed(2)}
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
