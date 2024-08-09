import {
  CENSORSHIP_SET,
  CENSORSHIPS_SET,
  CENSORSHIP_STATE_CLEAR,
} from "./../actions/actionTypes";
const initialState = {
  censorship: {},
  censorships: [],
};

const censorshipReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CENSORSHIP_SET:
      return { ...state, censorship: payload };
    case CENSORSHIPS_SET:
      return { ...state, censorships: payload };

    case CENSORSHIP_STATE_CLEAR:
      return {
        censorship: {},
        censorships: [],
      };
    default:
      return state;
  }
};

export default censorshipReducer;
