import React, { Component } from "react";

import styled from "styled-components";

//components
import { FormPanel, Header } from "../../../elements";
import ChooseProvider from "./views/ChooseProvider";
import ChooseRepos from "./views/ChooseRepos";
import ChooseName from "./views/ChooseName";
import WaitCreation from "./views/WaitCreation";

//react-router
import { Switch, Route, withRouter } from "react-router-dom";

class WorkspaceCreation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: [],
            workspaceId: null,
        };
    }

    componentDidMount() {
        const { history, onboarding } = this.props;

        const route = onboarding
            ? "/onboard/create_workspace/choose_provider"
            : "/create_workspace/choose_provider";

        console.log("ROUTE: ", route);
        history.push(route);
    }

    renderChooseProvider = () => {
        const { onboarding } = this.props;

        return <ChooseProvider onboarding={onboarding} />;
    };

    renderChooseRepos = () => {
        const { onboarding } = this.props;

        const { active } = this.state;

        return (
            <ChooseRepos
                onboarding={onboarding}
                active={active}
                setActive={(newActive) => this.setState({ active: newActive })}
            />
        );
    };

    renderChooseName = () => {
        const { onboarding } = this.props;

        const { active } = this.state;

        return (
            <ChooseName
                onboarding={onboarding}
                active={active}
                setCreatedWorkspaceId={(workspaceId) =>
                    this.setState({ workspaceId })
                }
            />
        );
    };

    renderWaitCreation = () => {
        const { onboarding } = this.props;

        const { workspaceId } = this.state;

        return (
            <WaitCreation onboarding={onboarding} workspaceId={workspaceId} />
        );
    };

    renderContent = () => {
        return (
            <>
                <Header>Create your personal workspace.</Header>
                <Switch>
                    <Route
                        path={[
                            "/onboard/create_workspace/choose_provider",
                            "/create_workspace/choose_provider",
                        ]}
                        render={this.renderChooseProvider}
                    />
                    <Route
                        path={[
                            "/onboard/create_workspace/choose_repos",
                            "/create_workspace/choose_repos",
                        ]}
                        render={this.renderChooseRepos}
                    />
                    <Route
                        path={[
                            "/onboard/create_workspace/choose_name",
                            "/create_workspace/choose_name",
                        ]}
                        render={this.renderChooseName}
                    />
                    <Route
                        path={[
                            "/onboard/create_workspace/wait_creation",
                            "/create_workspace/wait_creation",
                        ]}
                        render={this.renderWaitCreation}
                    />
                </Switch>
            </>
        );
    };

    renderAll = () => {
        const { onboarding } = this.props;

        const content = this.renderContent();

        if (onboarding) {
            return content;
        } else {
            return <FormPanel>{content}</FormPanel>;
        }
    };

    render() {
        return this.renderAll();
    }
}

export default withRouter(WorkspaceCreation);
