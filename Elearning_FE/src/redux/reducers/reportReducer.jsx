import {
  REPORT_SET,
  REPORTS_SET,
  REPORT_STATE_CLEAR,
  REPORTS_DETAILS_SET,
} from "./../actions/actionTypes";
const initialState = {
  report: {},
  reports: [],
  report_details: [],
};

const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REPORT_SET:
      return { ...state, report: payload };
    case REPORTS_SET:
      return { ...state, reports: payload };
    case REPORTS_DETAILS_SET:
      return { ...state, report_details: payload };
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
