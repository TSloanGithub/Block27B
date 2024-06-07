import { useState, useEffect } from "react";
import { store } from "../../app/store.js";
import { withdrawal } from "./transactionsReducer.js";
import { deposit } from "./transactionsReducer.js";
import { transfer } from "./transactionsReducer.js";

import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  const [balance, setBalance] = useState(store.getState().balance);
  // const [history, setHistory] = useState(store.getState().history);
  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState('');

  //This use effect is setting the balance to the value of the current state of balance. Store is the object all state is stored within.
  //Because the app allows us to change the input and the input changes after we hit withdraw/deposit/transfer. The useEffect updates it.
  useEffect(() => {
    const unsub = store.subscribe(() => {
      setBalance(store.getState().balance)
    });

    return unsub;
  }, []);

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;

    const amount = +amountStr;

    if (action === 'withdraw') {
      store.dispatch(withdrawal(amount));
    } else if (action === 'deposit'){
      store.dispatch(deposit(amount));
    } else if (action === 'transfer'){
      store.dispatch(transfer(amount, recipient));
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" 
            placeholder="Recipient Name" 
            name="recipient" 
            value={recipient} 
            onChange={(e)=>setRecipient(e.target.value)} 
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
