import React, { Component } from "react";

//components
import ContextPanel from "./context_panel/ContextPanel";

//react-redux
import { connect } from "react-redux";

//actions
import { getFileContext } from "../../../actions/ContextActions";

//react-router
import { withRouter } from "react-router-dom";

//lodash
import _ from "lodash";

class ContextDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
        };
    }

    componentDidMount = () => {
        //this.loadContext();
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
        return console.log("Testing");

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
        const { context } = this.props;

        // map through each integration source
        return Object.keys(context)
            .map((source) => {
                // extract all the data for that source for the
                // given context
                const modelData = context[source];

                // map through each type of model applicable
                // to the integration source
                return Object.keys(modelData).map((model) => {
                    // if there exists data
                    // of that model, create a context panel
                    const data = modelData[model];

                    if (!_.isEmpty(data)) {
                        return (
                            <ContextPanel
                                key={`${source}-${model}`}
                                source={source}
                                model={model}
                                data={data}
                            />
                        );
                    }
                });
            })
            .flat();
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
        /*
        github,
        trello,
        jira,*/
    } = state;

    /*
    github = _.pick(github, ["pullRequests", "commits", "branches", "tickets"]);

    trello = _.pick(trello, ["tickets"]);

    jira = _.pick(jira, ["tickets"]);
    */

    const context = {
        github: {
            pullRequests: [
                {
                    name: "Fixed Modularization of Blame Display",
                },
                {
                    name: "Implemented Github Webhooks",
                },
            ],
        },
        trello: {
            tickets: [
                {
                    name: "Backend Query Checklist",
                },
                {
                    name: "Cross-Platform Data Model Spec",
                },
                {
                    name: "Implement Worker Production Queue",
                },
            ],
        },
        jira: {},
        google: {
            documents: [
                {
                    name: "Async Document Update Flow",
                },
                {
                    name: "Board Selection Spec",
                },
            ],
        },
    };

    return {
        repositoryFullName,
        activeFilePath,
        repositories: Object.values(repositories),
        context,
    };
};

export default withRouter(
    connect(mapStateToProps, { getFileContext })(ContextDisplay)
);
