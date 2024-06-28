import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import documentReducer from "./reducers/documentReducer";
import commonReducer from "./reducers/commonReducer";
import commentReducer from "./reducers/commentReducer";

const rootReducer = combineReducers({
  categoryReducer: categoryReducer,
  commonReducer: commonReducer,
  documentReducer: documentReducer,
  commentReducer: commentReducer,
});

export default rootReducer;
