import { legacy_createStore as createStore } from "redux";
import transactionsReducer from '../features/transactions/transactionsReducer.js';

// TODO: Configure the store to use the reducer from the transactions slice.
export const store = createStore(transactionsReducer);
