import React, { Component } from "react";

//styles
import { ThemeProvider } from "styled-components";

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

class Root extends Component {
    componentDidMount = () => {
        window.addEventListener("message", this.handleExtensionMessage);

        this.handleRouting();
    };

    handleRouting = () => {
        const { isAuthorized, user, history } = this.props;

        if (!isAuthorized || !user) return history.push("/login");

        const { isOnboarded, workspaces } = user;

        if (!isOnboarded) return history.push("/onboard");

        return history.push(`/space/${workspaces[workspaces.length - 1]}`);
    };

    componentWillUnmount = () => {
        window.removeEventListener("message", this.handleExtensionMessage);
    };

    handleExtensionMessage = ({ data: message }) => {
        const { changeTheme, setGitInfo } = this.props;

        const { type, payload } = message;

        console.log("MESSAGE ENTERED", message);

        switch (type) {
            case CHANGE_THEME:
                changeTheme();

            case SET_GIT_INFO:
                setGitInfo(payload);

            default:
                return;
        }
    };

    render() {
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path="/onboard" component={OnboardFlow} />
                    <Route path="/login" component={Login} />
                    <Route path="/space/:workspaceId" component={Space} />
                </Switch>
            </ThemeProvider>
        );
    }
}

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
