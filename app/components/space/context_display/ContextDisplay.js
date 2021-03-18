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
        const { integrations } = this.props;

        return Object.keys(integrations).map((source) => {
            const data = integrations[source];

            // checks if there is integration data
            let hasData = false;

            // for every model..
            Object.keys(data).map((model) => {
                // if hasData is still false so far
                if (!hasData) {
                    // if the data for that model is not empty, set hasData to true
                    hasData = !_.isEmpty(data[model]);
                }
            });

            if (hasData) {
                return <ContextPanel source={source} data={data} />;
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
        jira,
    } = state;

    github = _.pick(github, ["pullRequests", "commits", "branches", "tickets"]);

    trello = _.pick(trello, ["tickets"]);

    jira = _.pick(jira, ["tickets"]);

    return {
        repositoryFullName,
        activeFilePath,
        repositories: Object.values(repositories),
        integrations: { github, trello, jira },
    };
};

export default withRouter(
    connect(mapStateToProps, { getFileContext })(ContextDisplay)
);
