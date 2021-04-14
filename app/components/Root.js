import React, { Component } from "react";

//styles
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

//sentry
import * as Sentry from "@sentry/react";

//components
import Login from "./login/Login";
import Space from "./space/Space";
import OnboardFlow from "./setup/onboarding/OnboardFlow";
import WorkspaceCreation from "./setup/workspace_creation/WorkspaceCreation";
import LoadingScreen from "./loading_screen/LoadingScreen";
import ErrorDisplay from "./error_handling/ErrorDisplay";

//actions
import { changeTheme } from "../actions/ThemeActions";
import { setGitInfo } from "../actions/GlobalActions";
import {
    storeExtensionMessage,
    extensionAuthenticateUser,
} from "../actions/ExtensionActions";

//types
import { CHANGE_THEME } from "../actions/types/ThemeTypes";
import { SET_GIT_INFO } from "../actions/types/GlobalTypes";
import { AUTHENTICATE_USER } from "../actions/types/AuthTypes";
import {
    GET_VALUE_GLOBAL_STORAGE,
    RECEIVE_VALUE_GLOBAL_STORAGE,
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

        if (workspaces.length == 0) {
            return history.push("/create_workspace");
        }

        return history.push(`/space/${workspaces[0]._id}/blame`);

        //return history.push("/error");

        return history.push(`/space/${workspaces[0]._id}/blame`);

        return history.push(`/space/${workspaces[0]._id}/settings/user`);
    };

    componentWillUnmount = () => {
        window.removeEventListener("message", this.handleExtensionMessage);
    };

    handleExtensionMessage = async ({ data: message }) => {
        const { changeTheme, setGitInfo } = this.props;

        const { type, payload } = message;

        switch (type) {
            case CHANGE_THEME:
                changeTheme();

                break;
            case SET_GIT_INFO:
                setGitInfo(payload);

                break;
            case RECEIVE_VALUE_GLOBAL_STORAGE:
                switch (payload.dispatchType) {
                    case AUTHENTICATE_USER:
                        const { extensionAuthenticateUser } = this.props;

                        if (payload.value && payload.value.isAuthorized) {
                            await extensionAuthenticateUser(payload);
                        }

                        this.setState({ receivedAuth: true });

                        this.handleRouting();
                    default:
                        break;
                }

                break;
            default:
                return;
        }
    };

    renderContent = () => {
        const { hasError } = this.props;

        if (hasError) return <ErrorDisplay />;

        return (
            <Switch>
                <Route path="/create_workspace" component={WorkspaceCreation} />
                <Route path="/onboard" component={OnboardFlow} />
                <Route path="/login" component={Login} />
                <Route
                    path="/space/:workspaceId"
                    render={() => <Space testItem={this.state.testItem} />}
                />
                <Route path="/loading_screen" component={LoadingScreen} />
            </Switch>
        );
    };

    render() {
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Sentry.ErrorBoundary
                    fallback={({ resetError }) => {
                        return (
                            <ErrorDisplay resetError={resetError} zIndex={-1} />
                        );
                    }}
                >
                    {this.renderContent()}
                </Sentry.ErrorBoundary>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        theme,
        auth: { isAuthorized, user },
        errors: { hasError },
    } = state;

    return {
        theme,
        isAuthorized,
        user,
        hasError,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        changeTheme,
        setGitInfo,
        storeExtensionMessage,
        extensionAuthenticateUser,
    })(Root)
);

function FallbackComponent() {
    return <Box>An error has occurred</Box>;
}

const myFallback = <FallbackComponent />;

const Box = styled.div`
    background-color: red;

    height: 50rem;

    width: 40rem;
`;
