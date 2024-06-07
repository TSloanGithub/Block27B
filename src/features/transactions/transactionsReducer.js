/**
 * Each transaction is recorded as an object with the following properties.
 * @typedef Transaction
 * @property {"deposit"|"withdrawal"|"transfer/[name]"} type
 * @property {number} amount
 * @property {number} balance - The balance after the transaction is completed.
 */

// TODO: Set initial state to have a balance of 0 and an empty array of transactions.

/** @type {{balance: number, history: Transaction[]}} */
const initialState = {
  balance: 0,
  history: [],
};

/* TODO
Add two action handlers to the transactions reducer: "deposit" and "transfer".
Both handlers update the balance and then record the transaction.

"deposit" should increase the balance by the amount in the payload,
while "transfer" should decrease the balance by the amount in the payload.

Refer to the "withdrawal" handler, which is already implemented for you.
*/

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'withdrawal':
      state.balance -= action.data.amount;
      state.history = state.history.concat([{
        type: 'withdrawal',
        amount: action.data.amount,
        balance: state.balance,
      }]);
      break;
    case 'deposit':
      state.balance += action.data.amount;
      state.history = state.history.concat([{
        type: 'deposit',
        amount: action.data.amount,
        balance: state.balance,
      }]);
      break;
    case 'transfer':
      state.balance += action.data.amount;
      state.history = state.history.concat([{
          type: `transfer/ ${action.data.recipient}`,
          amount: action.data.amount,
          balance: state.balance,
      }]);

      return state;
    default:
      return state;
  }
  return state;
};

export const withdrawal = (amount) => {
  return {
    type: 'withdrawal',
    data: {
      amount,
    },
  };
}

export const deposit = (amount) => {
  // TODO
  return {
    type: 'deposit',
    data: {
      amount,
    },
  };
}

export const transfer = (amount,recipient) => {
  // TODO
  return {
    type: 'transfer',
    data: {
      amount,
      recipient
    }
  }
}

export const selectBalance = (state) => state.balance;
export const selectHistory = (state) => state.history;

export default transactionsReducer;
