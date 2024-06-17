import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import documentReducer from "./reducers/documentReducer";
import commonReducer from "./reducers/commonReducer";

const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer: commonReducer,
    documentReducer:documentReducer,
});

export default rootReducer;
