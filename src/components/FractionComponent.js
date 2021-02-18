import React, { useState } from "react";

import styles from "../styles/FractionComponent.module.css";
import { AVAILABLE_FRACTIONS } from "../utils";

function FractionComponent() {
  const [errors, setErrors] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [availableFractions] = useState(AVAILABLE_FRACTIONS);
  const [listFractions, setListFractions] = useState([]);
  const [leftFractions, setLeftFractions] = useState(0);

  function handleCalculateFractions(e) {
    let currentAmount = inputAmount.replace(/[^\d,]+/g, "");
    currentAmount = +currentAmount.replace(",", ".");

    setLeftFractions(0);

    let temp = [];

    if (errors.length <= 0 && currentAmount) {
      while (currentAmount != 0) {
        let fraction = availableFractions.find((x) => currentAmount >= x);

        // if amount have fractions, push to fractions and calculate left amount;
        if (fraction) {
          const d = temp.find((x) => x.amount === fraction);
          if (d) {
            d.qty += 1;
          } else {
            let objFraction = { amount: fraction, qty: 1 };
            temp.push(objFraction);
          }

          // setListFractions(prev => [...prev, objFraction])

          currentAmount = currentAmount - fraction;
        } else {
          // if amount no have fractions, fill leftFractions and set current amount to zero;
          setLeftFractions(currentAmount);
          currentAmount -= currentAmount;
        }
      }
    }
    setListFractions(temp);

    e.preventDefault();
  }

  function handleInputAmount(e) {
    setListFractions([]);

    setInputAmount(e.target.value);
  }

  return (
    <div className={styles.container}>
     
      <div className={styles.section__card}>
        <div className={styles.section__head}>
          <h3>Fraction Rupiah Calculator</h3>
        </div>
        <div className={styles.section__body}>
          <form
            className={styles.form__container}
            onSubmit={handleCalculateFractions}
          >
            <div className={styles.input__form}>
              <input
                type="text"
                placeholder="Enter Amount Rupiah"
                value={inputAmount}
                onChange={handleInputAmount}
              />
              <div style={{ color: "red" }}>
                <span>{errors}</span>
              </div>
            </div>
          </form>

          <div className={styles.btn__submit}>
            <button className={styles.btn} type="submit">Calculate</button>
          </div>

          <div className={styles.fraction__title}>
            <h4>Results :</h4>
          </div>
          <div className={styles.fraction__results}>
            {listFractions.map((fraction, idx) => (
                <span key={idx} className={`chips__fraction__${fraction.amount}`}>{fraction.amount}({fraction.qty})x</span>
            ))}
            
            {leftFractions !== 0 && <span>left {leftFractions}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FractionComponent;
