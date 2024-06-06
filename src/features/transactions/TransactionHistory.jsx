import "./transactionHistory.scss";
import { useState, useEffect } from "react";
import { store } from "../../app/store";
// import { withdrawal } from "./transactionsReducer";
// import { deposit } from "./transactionsReducer";

/** Displays a table row with transaction information  */
const TransactionRow = ({ transaction: { type, amount, balance } }) => (
  <tr>
    <th scope="row">{type}</th>
    <td>{amount.toFixed(2)}</td>
    <td>{balance.toFixed(2)}</td>
  </tr>
);

/** Displays a table of the user's transaction history. */
export default function TransactionHistory() {
  // TODO: Get the transaction history from the Redux store using the useEffect hook
  const [history, setHistory] = useState(store.getState().history)
  useEffect(()=>{
    const unsub = store.subscribe(()=>{
      setHistory(store.getState().history);
    });

    return unsub;
  },[])

  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {history.map((transaction, index)=>{
            return (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.balance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}
