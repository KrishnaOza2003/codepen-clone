import { combineReducers } from "redux";
import { userAuthReducer } from "./userAuthReducer";
import { searchReducer } from "./SearchReducer";
import { projectReducer } from "./projectReducer";

export const myReducer = combineReducers({
  user: userAuthReducer,
  searchTerm: searchReducer,
  projects: projectReducer,
});
