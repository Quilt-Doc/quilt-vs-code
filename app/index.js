import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";

import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.querySelector("#root")
);
