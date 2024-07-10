import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import documentReducer from "./reducers/documentReducer";
import commonReducer from "./reducers/commonReducer";
import commentReducer from "./reducers/commentReducer";
import accountReducer from "./reducers/accountReducer";

const rootReducer = combineReducers({
  categoryReducer: categoryReducer,
  accountReducer:accountReducer,
  commonReducer: commonReducer,
  documentReducer: documentReducer,
  commentReducer: commentReducer,

});

export default rootReducer;
