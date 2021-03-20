import React, { Component } from "react";

//components
import SpaceNavbar from "./navbar/SpaceNavbar";
import ContextDisplay from "./context_display/ContextDisplay";
import Settings from "./settings/Settings";
import Test from "./Test";

//actions
import { setRepositories } from "../../actions/RepositoryActions";
import { retrieveWorkspaces } from "../../actions/WorkspaceActions";
import { retrieveContexts } from "../../actions/ContextActions";

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
            retrieveContexts,
            setRepositories,
        } = this.props;

        const { workspaceId } = match.params;

        if (!workspaceId) {
            return;
        }

        try {
            await Promise.all([
                retrieveWorkspaces({ userId }),
                retrieveContexts({ workspaceId }),
            ]);
        } catch (e) {
            throw new Error(e);
        }

        const { workspaces } = this.props;

        const currentWorkspace = workspaces[workspaceId];

        const { repositories } = currentWorkspace;

        setRepositories({ repositories });

        this.setState({ loaded: true });
    };

    renderContent = () => {
        return (
            <Switch>
                <Route
                    path="/space/:workspaceId/settings"
                    component={Settings}
                />
                <Route
                    path="/space/:workspaceId/blame"
                    component={BlameDisplay}
                />
                <Route path="/space/:workspaceId/context" component={Test} />
            </Switch>
        );
    };

    render() {
        const { loaded } = this.state;

        return (
            <>
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
        retrieveContexts,
    })(Space)
);
