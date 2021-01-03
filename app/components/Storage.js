import React, { useEffect, useMemo } from "react";

//styles
import styled, { ThemeProvider } from "styled-components";

//components
import Login from "./login/Login";
import Space from "./space/Space";
import OnboardFlow from "./setup/onboarding/OnboardFlow";

//actions
import { changeTheme } from "../actions/ThemeActions";
import { setGitInfo } from "../actions/GlobalActions";

//types
import { CHANGE_THEME } from "../actions/types/ThemeTypes";
import { SET_GIT_INFO } from "../actions/types/GlobalTypes";

//redux
import { connect } from "react-redux";

//router
import { Route, Switch, withRouter } from "react-router-dom";

const Root = ({
    changeTheme,
    setGitInfo,
    theme,
    isAuthorized,
    user,
    history,
    location,
}) => {
    useEffect(() => {
        window.addEventListener("message", handleExtensionMessage);

        return () =>
            window.removeEventListener("message", handleExtensionMessage);
    }, []);

    useEffect(() => {
        const { pathname } = location;

        if (!isAuthorized || !user) {
            if (pathname !== "/login") history.push("/login");
        } else if (!user.isOnboarded) {
            if (!pathname.includes("/onboard")) history.push("/onboard");
        } else if (!pathname.includes("/space")) {
            history.push("/space");
        }
    }, [isAuthorized, user, location]);

    const handleExtensionMessage = useMemo(
        () => ({ data: message }) => {
            const { type, payload } = message;

            switch (type) {
                case CHANGE_THEME:
                    changeTheme();
                case SET_GIT_INFO:
                    setGitInfo(payload);
                default:
                    return;
            }
        },
        [changeTheme]
    );

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Route path="/onboard" component={OnboardFlow} />
                <Route path="/login" component={Login} />
                <Route path="/space" component={Space} />
            </Switch>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    const {
        theme,
        auth: { isAuthorized, user },
    } = state;

    return {
        theme,
        isAuthorized,
        user,
    };
};

export default withRouter(
    connect(mapStateToProps, { changeTheme, setGitInfo })(Root)
);
