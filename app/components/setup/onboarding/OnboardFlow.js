import React, { Component } from "react";

//components
import { FormPanel } from "../../../elements";
import OnboardForm from "./OnboardForm";
import WorkspaceCreation from "../workspace_creation/WorkspaceCreation";

//react-router
import { Switch, Route } from "react-router-dom";

class OnboardFlow extends Component {
    componentDidMount = () => {
        const { history, location } = this.props;

        history.push("/onboard/setup");
    };

    renderWorkspaceCreation = () => {
        return <WorkspaceCreation onboarding={true} />;
    };

    render() {
        return (
            <FormPanel>
                <Switch>
                    <Route path="/onboard/setup" component={OnboardForm} />
                    <Route
                        path="/onboard/create_workspace"
                        render={this.renderWorkspaceCreation}
                    />
                </Switch>
            </FormPanel>
        );
    }
}

export default OnboardFlow;
