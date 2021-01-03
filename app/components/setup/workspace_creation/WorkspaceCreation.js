import React, { Component } from "react";

import styled from "styled-components";

//components
import { Header } from "../../../elements";
import ChooseProvider from "./views/ChooseProvider";
import ChooseRepos from "./views/ChooseRepos";
import ChooseName from "./views/ChooseName";
import WaitCreation from "./views/WaitCreation";

//react-router
import { Switch, Route } from "react-router-dom";

class WorkspaceCreation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: [],
            workspaceId: null,
        };
    }

    componentDidMount() {
        const { history } = this.props;

        history.push("/onboard/create_workspace/choose_provider");
    }

    renderChooseProvider = () => {
        return <ChooseProvider />;
    };

    renderChooseRepos = () => {
        const { active } = this.state;

        return (
            <ChooseRepos
                active={active}
                setActive={(newActive) => this.setState({ active: newActive })}
            />
        );
    };

    renderChooseName = () => {
        const { active } = this.state;

        return (
            <ChooseName
                active={active}
                setCreatedWorkspaceId={(workspaceId) =>
                    this.setState({ workspaceId })
                }
            />
        );
    };

    renderWaitCreation = () => {
        const { workspaceId } = this.state;

        return <WaitCreation workspaceId={workspaceId} />;
    };

    render() {
        return (
            <>
                <Header>Create your personal workspace.</Header>
                <Switch>
                    <Route
                        path="/onboard/create_workspace/choose_provider"
                        render={this.renderChooseProvider}
                    />
                    <Route
                        path="/onboard/create_workspace/choose_repos"
                        render={this.renderChooseRepos}
                    />
                    <Route
                        path="/onboard/create_workspace/choose_name"
                        render={this.renderChooseName}
                    />
                    <Route
                        path="/onboard/create_workspace/wait_creation"
                        render={this.renderWaitCreation}
                    />
                </Switch>
            </>
        );
    }
}

export default WorkspaceCreation;
