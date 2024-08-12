import {
  REPORT_SET,
  REPORTS_SET,
  REPORT_STATE_CLEAR,
} from "./../actions/actionTypes";
const initialState = {
  report: {},
  reports: [],
};

const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REPORT_SET:
      return { ...state, report: payload };
    case REPORTS_SET:
      return { ...state, reports: payload };

    case REPORT_STATE_CLEAR:
      return {
        report: {},
        reports: [],
      };
    default:
      return state;
  }
};

export default reportReducer;
