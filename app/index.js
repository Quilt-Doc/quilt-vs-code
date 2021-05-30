import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";

import store from "./store";

import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://a7f8d6e36cbb4249a9d4a6e5f4c3f78b@o504090.ingest.sentry.io/5590368",
});

ReactDOM.render(
    <Provider store={store}>
        <MemoryRouter>
            <Root />
        </MemoryRouter>
    </Provider>,
    document.querySelector("#root")
);
