import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";

import store from "./store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <MemoryRouter>
            <Root />
        </MemoryRouter>
    </Provider>,
    document.querySelector("#root")
);
