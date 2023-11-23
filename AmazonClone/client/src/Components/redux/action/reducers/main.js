import { getproductsreducer } from "./Productsreducer";

import { combineReducers } from "redux";

const rootereducers = combineReducers({
  getproductsdata: getproductsreducer,
});

export default rootereducers;
