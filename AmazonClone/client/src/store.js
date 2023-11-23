import {applyMiddleware} from "redux";
import {legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootereducers from "./Components/redux/action/reducers/main";

const middleware =[thunk];

const store = createStore(
    rootereducers,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;