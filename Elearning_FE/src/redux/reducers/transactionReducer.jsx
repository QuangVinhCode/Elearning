import {
  TRANSACTIONS_SET,
  TRANSACTION_SET,
  TRANSACTION_STATE_CLEAR,
} from "./../actions/actionTypes";
const initialState = {
  transaction: {},
  transactions: [],
};

const transactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_SET:
      return { ...state, transaction: payload };
    case TRANSACTIONS_SET:
      return { ...state, transactions: payload };

    case TRANSACTION_STATE_CLEAR:
      return {
        transaction: {},
        transactions: [],
      };
    default:
      return state;
  }
};

export default transactionReducer;
