import { combineReducers } from "redux";
import * as dux from "./test_dux";

const rootReducer = combineReducers(
	// other reducer,
	dux
);
export default rootReducer;
