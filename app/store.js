import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/";

export default createStore(reducers, compose(applyMiddleware(reduxThunk)));
