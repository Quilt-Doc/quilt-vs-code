import React, { Component } from "react";

//styles
import { ThemeProvider } from "styled-components";

//components
import Login from "./login/Login";
import Space from "./space/Space";
import OnboardFlow from "./setup/onboarding/OnboardFlow";
import WorkspaceCreation from "./setup/workspace_creation/WorkspaceCreation";
import LoadingScreen from "./loading_screen/LoadingScreen";

//actions
import { changeTheme } from "../actions/ThemeActions";
import { setGitInfo } from "../actions/GlobalActions";
import { sendExtensionMessage } from "../actions/ExtensionActions";

//types
import { CHANGE_THEME } from "../actions/types/ThemeTypes";
import { SET_GIT_INFO } from "../actions/types/GlobalTypes";
import { AUTHENTICATE_USER } from "../actions/types/AuthTypes";
import {
    GET_VALUE_GLOBAL_STORAGE,
    SEND_VALUE_GLOBAL_STORAGE,
} from "../vscode/types/messageTypes"; //"/vscode/types/messageTypes.js

//vscode
import vscode from "../vscode/vscode";

//redux
import { connect } from "react-redux";

//router
import { Route, Switch, withRouter } from "react-router-dom";

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            receivedAuth: false,
        };
    }

    componentDidMount = () => {
        window.addEventListener("message", this.handleExtensionMessage);

        this.getAuthenticationDetails();

        this.handleRouting();
    };

    getAuthenticationDetails = () => {
        console.log("POSTING FROM WEBVIEW: GET_VALUE_GLOBAL_STORAGE");
        vscode.postMessage({
            type: GET_VALUE_GLOBAL_STORAGE,
            payload: {
                key: "auth",
                dispatchType: AUTHENTICATE_USER,
            },
        });
    };

    handleRouting = () => {
        const { isAuthorized, user, history } = this.props;

        const { receivedAuth } = this.state;

        if (!receivedAuth) return history.push("/loading_screen");

        if (!isAuthorized || !user) return history.push("/login");

        const { isOnboarded, workspaces } = user;

        if (!isOnboarded) return history.push("/onboard");

        console.log("Workspaces", workspaces);

        if (workspaces.length == 0) {
            return history.push("/create_workspace");
        }

        return history.push(`/space/${workspaces[0]._id}/settings/user`);
    };

    componentWillUnmount = () => {
        window.removeEventListener("message", this.handleExtensionMessage);
    };

    handleExtensionMessage = ({ data: message }) => {
        const { changeTheme, setGitInfo, sendExtensionMessage } = this.props;

        const { type, payload } = message;

        switch (type) {
            case CHANGE_THEME:
                changeTheme();

            case SET_GIT_INFO:
                setGitInfo(payload);

            case SEND_VALUE_GLOBAL_STORAGE:
                if (payload.value != null) {
                    console.log("IS THERE A PAYLOAD VALUE", payload.value);

                    sendExtensionMessage(payload);
                }

                if (payload.dispatchType == AUTHENTICATE_USER) {
                    this.setState({ receivedAuth: true });

                    this.handleRouting();
                }

            default:
                return;
        }
    };

    render() {
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route
                        path="/create_workspace"
                        component={WorkspaceCreation}
                    />
                    <Route path="/onboard" component={OnboardFlow} />
                    <Route path="/login" component={Login} />
                    <Route path="/space/:workspaceId" component={Space} />
                    <Route path="/loading_screen" component={LoadingScreen} />
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
    connect(mapStateToProps, { changeTheme, setGitInfo, sendExtensionMessage })(
        Root
    )
);
