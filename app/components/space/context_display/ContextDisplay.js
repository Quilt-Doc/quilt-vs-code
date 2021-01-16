import React, { Component } from "react";

//components
import ContextPanel from "./context_panel/ContextPanel";

//react-redux
import { connect } from "react-redux";

//actions
import { getFileContext } from "../../../actions/AssociationActions";

//react-router
import { withRouter } from "react-router-dom";

//lodash
import _ from "lodash";

class ContextDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount = () => {
        this.loadContext();
    };

    componentDidUpdate = (prevProps) => {
        const { repositoryFullName, activeFilePath } = this.props;

        if (!repositoryFullName || !activeFilePath) return;

        if (
            repositoryFullName !== prevProps.repositoryFullName ||
            activeFilePath !== prevProps.activeFilePath
        ) {
            this.loadContext();
        }
    };

    loadContext = async () => {
        const {
            repositoryFullName,
            activeFilePath,
            match,
            repositories,
            getFileContext,
        } = this.props;

        const { workspaceId } = match.params;

        const repositoriesMap = _.mapKeys(repositories, "fullName");

        const repository = repositoriesMap[repositoryFullName];

        if (!repository) return;

        const { _id: repositoryId } = repository;

        await getFileContext({
            repositoryId,
            workspaceId,
            filePath: activeFilePath,
        });

        this.setState({ loaded: true });
    };

    renderPanels = () => {
        const { contexts } = this.props;

        console.log("ENTERED HERE", contexts);

        return Object.keys(contexts).map((integration) => {
            const context = contexts[integration];
            if (!_.isEmpty(context)) {
                return (
                    <ContextPanel integration={integration} context={context} />
                );
            }
        });
    };

    render() {
        const { loaded } = this.state;

        return <>{loaded && this.renderPanels()}</>;
    }
}

const mapStateToProps = (state) => {
    let {
        global: { repositoryFullName, activeFilePath },
        repositories,
        github,
        trello,
    } = state;

    github = _.pick(github, ["pullRequests", "commits"]);

    return {
        repositoryFullName,
        activeFilePath,
        repositories: Object.values(repositories),
        contexts: { github, trello },
    };
};

export default withRouter(
    connect(mapStateToProps, { getFileContext })(ContextDisplay)
);
