import React, { Component } from "react";

//components
import SpaceNavbar from "./navbar/SpaceNavbar";
import ContextDisplay from "./context_display/ContextDisplay";
import Settings from "./settings/Settings";

//actions
import { setRepositories } from "../../actions/RepositoryActions";
import { retrieveWorkspaces } from "../../actions/WorkspaceActions";

//redux
import { connect } from "react-redux";

//router
import { withRouter, Switch, Route } from "react-router-dom";
import BlameDisplay from "./blame_display/BlameDisplay";

class Space extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount = async () => {
        const {
            user: { _id: userId },
            match,
        } = this.props;

        const {
            retrieveWorkspaces,

            setRepositories,
        } = this.props;

        const { workspaceId } = match.params;

        if (!workspaceId) {
            return;
        }

        await retrieveWorkspaces({ userId });

        const { workspaces } = this.props;

        const currentWorkspace = workspaces[workspaceId];

        const { repositories } = currentWorkspace;

        setRepositories({ repositories });

        this.setState({ loaded: true });
    };

    renderContent = () => {
        return (
            <>
                <Switch>
                    <Route
                        path="/space/:workspaceId/settings"
                        component={Settings}
                    />
                    <Route
                        path="/space/:workspaceId/blame"
                        component={BlameDisplay}
                    />
                    <Route
                        path="/space/:workspaceId/context"
                        component={ContextDisplay}
                    />
                </Switch>
            </>
        );
    };

    render() {
        const { loaded } = this.state;

        const { testItem } = this.props;

        return (
            <>
                {testItem}
                <SpaceNavbar />
                {loaded && this.renderContent()}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        workspaces,
        auth: { user },
    } = state;

    return {
        workspaces,
        user,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        setRepositories,
        retrieveWorkspaces,
    })(Space)
);
