import React, { Component } from "react";

//styles
import styled from "styled-components";

//component
import UserSettings from "./user_settings/UserSettings";
import WorkspaceSettings from "./workspace_settings/WorkspaceSettings";

//router
import { withRouter, Switch, Route } from "react-router-dom";

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    routeUserSettings = () => {
        const { history, match } = this.props;

        const { workspaceId } = match.params;

        history.push(`/space/${workspaceId}/settings/user`);
    };

    routeWorkspaceSettings = () => {
        const { history, match } = this.props;

        const { workspaceId } = match.params;

        history.push(`/space/${workspaceId}/settings/workspace`);
    };

    render() {
        const {
            location: { pathname },
        } = this.props;

        const split = pathname.split("/");

        let pageIdentifier;

        if (split.length > 4) {
            pageIdentifier = split[4];
        }

        return (
            <>
                <Container>
                    <Tab
                        active={pageIdentifier == "user"}
                        onClick={this.routeUserSettings}
                    >
                        User
                    </Tab>
                    <Tab
                        active={pageIdentifier == "workspace"}
                        onClick={this.routeWorkspaceSettings}
                    >
                        Workspace
                    </Tab>
                </Container>
                <Switch>
                    <Route
                        path="/space/:workspaceId/settings/workspace"
                        component={WorkspaceSettings}
                    />
                    <Route
                        path="/space/:workspaceId/settings/user"
                        component={UserSettings}
                    />
                </Switch>
            </>
        );
    }
}

export default withRouter(Settings);

const Container = styled.div`
    display: flex;

    align-items: center;

    margin-top: 1rem;
`;

const Tab = styled.div`
    margin-right: 0.6rem;

    font-weight: 500;

    font-size: 1.2rem;

    opacity: 0.8;

    background-color: ${(props) =>
        props.active ? props.theme.SHADE_15 : props.theme.SHADE_3};

    height: 3rem;

    padding: 0rem 0.9rem;

    border-radius: 0.4rem;

    display: flex;

    align-items: center;

    &:last-of-type {
        margin-right: 0rem;
    }

    &:hover {
        background-color: ${(props) => props.theme.SHADE_15};
    }

    cursor: pointer;

    transition: border 0.1s ease-in;
`;
