import { ACCOUNTS_SET, ACCOUNT_SET, LOG_IN, LOG_OUT } from "../actions/actionTypes";


const initialState = {
  account: {},
  accounts: [],
  isLoggedIn: false,
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT_SET:
      return { ...state, account: payload };
    case ACCOUNTS_SET:
      return { ...state, accounts: payload };
    case LOG_IN:
      return { ...state, account: payload, isLoggedIn: true };
    case LOG_OUT:
      return { ...state, account: {}, isLoggedIn: false };
    default:
      return state;
  }
};

export default accountReducer;
