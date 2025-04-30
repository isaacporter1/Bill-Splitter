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


  const placeholderNames = ["Sung Jinwoo", "Isagi Yoichi", "Goku",
    "Kageyama Goat", "Satoru Gojo", "Yuji Itadori",
    "Toji Fushiguro", "Nagi Seishiro"];

  return (
    <>
      {state !== 0 && (
        <div>
          <button
            onClick={() => state !== 1 ? setState(1) : setState(0)}
          >
            Reset
          </button>
        </div>
      )}

      {state == 0 && (
        <div>
          <button
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
        <div>
          How many people are you splitting the bill with? <input id="personCount" type="number" min="2" max="20" step="1"
            value={personCount}
            onChange={(e) => setPersonCount(Number(e.target.value))} />
          <button
            onClick={() => {
              const initialPeople = Array.from({ length: personCount }, () => ({
                name: '',
                subtotal: 0,
                total: 0,
              }));
              setPeople(initialPeople);
              setState(2);
            }}>
            Confirm
          </button>
        </div>
      )}

      {state === 2 && (
        <div>
          {people.map((person, index) => (
            <div key={index} style={{ marginTop: "15px" }}>
              Person {index + 1} Name:{' '}
              <input
                type="text"
                placeholder={placeholderNames[index] || `Person ${index + 1}`}
                value={person.name}
                onChange={(e) => {
                  const updated = [...people];
                  updated[index].name = e.target.value;
                  setPeople(updated);
                }}
              />
              {' '}– SubTotal:{' '}$
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={person.subtotal}
                onChange={(e) => {
                  const updated = [...people];
                  updated[index].subtotal = parseFloat(e.target.value || 0);
                  setPeople(updated);
                }}
              />
            </div>
          ))}
          <div style={{ marginTop: "15px" }}><button onClick={() => {
            setState(3)
            
            const totalSub = people.reduce((acc, person) => acc + person.subtotal, 0);
            setSubTotal(totalSub);
          }}>
            Confirm
          </button></div>
        </div>
      )}

      {state == 3 && (
        <div>
          Total Tax: $<input id="taxAmount" type="number" step="0.01" placeholder="0.00"
            onChange={(e) => { setTax(Number(e.target.value)); }}
          />
          <button
            onClick={() => setState(4)}>
            Confirm
          </button>
        </div>
      )}

      {state == 4 && (
        <div>
          Total Tip: $<input id="tipAmount" type="number" step="0.01" placeholder="0.00"
            onChange={(e) => { setTip(Number(e.target.value)); }}
          />
          <button
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
          <p>With a Sub Total of: ${subTotal.toFixed(2)}</p>
          <p>A Tax Amount of: ${tax.toFixed(2)}</p>
          <p>And a Tip of: ${tip.toFixed(2)}</p>

          {people.map((person, index) => {
            const personTotal = person.subtotal + (person.subtotal / subTotal) * (tax + tip);

            return (
              <div key={index} style={{ marginTop: "15px" }}>
                {person.name}'s Total:{' '}${personTotal.toFixed(2)}
              </div>
            );
          })}

          <p>For a Total of: ${(Number(subTotal) + tax + tip).toFixed(2)}</p>

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
