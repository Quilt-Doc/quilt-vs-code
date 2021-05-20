import React, { Component } from "react";
import PropTypes from "prop-types";

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

        console.log("React: loadContext params", {
            repositoryFullName,
            activeFilePath,
            match,
            repositories,
            getFileContext,
        });

        const { workspaceId } = match.params;

        const repositoriesMap = _.mapKeys(repositories, "fullName");

        const repository = repositoriesMap[repositoryFullName];

        if (!repository) return;

        console.log("React: Found Repository", repository);

        const { _id: repositoryId } = repository;

        console.log("React: getFileContext params", {
            repositoryId,
            workspaceId,
            filePath: activeFilePath,
        });

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
        context,
    } = state;

    context = {
        github: {
            pullRequests: [
                {
                    name: "Ensure updating Context.Consumer inside suspended Suspense component  CLA Signed",
                    description:
                        "Implemented Code object bulk scrape, and API route to fetch given file path.",
                },
                {
                    name: "Add GitHub action to check for bug reprod",
                    description:
                        "Implemented Code object bulk scrape, and API route to fetch given file path.",
                },
            ],
            /*
            commits: [
                {
                    name: "testing method helpers v1",
                },
                {
                    name: "testing method helper 1",
                },
                {
                    name: "model refactoring 1",
                },
                {
                    name: "will this send a webhook event?",
                },
            ],
            tickets: [],
            */
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

ContextDisplay.propTypes = {
    // full name of repository ("kgodara-testing/doc-app")
    repositoryFullName: PropTypes.string,
    // file path from the root
    activeFilePath: PropTypes.string,
    // repositories from redux
    repositories: PropTypes.array,
    // context object with keys of source, nested keys of model, nested array of items
    context: PropTypes.object,
    match: PropTypes.object,
    getFileContext: PropTypes.func,
};

/*  Placeholder data
  context = {
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
    };*/
