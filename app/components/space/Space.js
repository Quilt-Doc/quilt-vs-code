import React, { Component } from "react";

//components
import SpaceNavbar from "./navbar/SpaceNavbar";
import ContextDisplay from "./context_display/ContextDisplay";
import IntegrationPanel from "./settings/integrations/IntegrationPanel";

//actions
import { setRepositories } from "../../actions/RepositoryActions";
import { retrieveWorkspaces } from "../../actions/WorkspaceActions";

//redux
import { connect } from "react-redux";

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

        const { retrieveWorkspaces, setRepositories } = this.props;

        const { workspaceId } = match.params;

        if (!workspaceId) {
            return;
        }

        try {
            await retrieveWorkspaces({ userId });
        } catch (e) {
            throw new Error(e);
        }

        const { workspaces } = this.props;

        const currentWorkspace = workspaces[workspaceId];

        const { repositories } = currentWorkspace;

        setRepositories({ repositories });

        this.setState({ loaded: true });
    };

    render() {
        const { loaded } = this.state;

        return (
            <>
                <SpaceNavbar />
                {loaded && <IntegrationPanel />}
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

export default connect(mapStateToProps, {
    setRepositories,
    retrieveWorkspaces,
})(Space);
