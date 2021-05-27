import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";

//components
import ContextPanel from "./context_panel/ContextPanel";
import ContextSearchPanel from "./ContextSearchPanel";
import { Loader } from "../../../elements";

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
            isLoaded: false,
            searchQuery: "",
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
            this.setState({ isLoaded: false });

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

        this.setState({ isLoaded: true });
    };

    setSearchQuery = (query) => {
        const { isLoaded, searchTimeout } = this.state;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (isLoaded) {
            this.setState({
                isLoaded: false,
            });
        }

        this.setState({
            searchTimeout: setTimeout(async () => {
                this.setState({
                    searchQuery: query,
                    isLoaded: true,
                });
            }, 1000),
        });
    };

    renderPanels = () => {
        let { context } = this.props;

        const { searchQuery } = this.state;

        // map through each integration source
        return Object.keys(context)
            .map((source) => {
                // extract all the data for that source for the
                // given context
                const modelData = context[source];

                // map through each type of model applicable
                // to the integration source
                const allModels = ["tickets", "pullRequests", "commits", "branches"];

                return allModels.map((model) => {
                    // if there exists data
                    // of that model, create a context panel
                    let data = modelData[model];

                    if (_.isNil(data) || _.isEmpty(data)) return;

                    console.log("SEARCH QUERY", searchQuery);

                    data = data.filter((item) =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    console.log(`${model} DATA`, data);

                    if (_.isNil(data) || _.isEmpty(data)) return;

                    return (
                        <ContextPanel
                            key={`${source}-${model}`}
                            source={source}
                            model={model}
                            data={data}
                        />
                    );
                });
            })
            .flat();
    };

    render() {
        const { isLoaded } = this.state;

        return (
            <>
                <ContextSearchPanel setSearchQuery={this.setSearchQuery} />
                {isLoaded ? this.renderPanels() : <Loader />}
                <BlankSpace />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let {
        global: { repositoryFullName, activeFilePath },
        repositories,
        context,
    } = state;

    if (context.github) {
        console.log("CONTEXT", context);

        context.github.tickets = [
            { name: "Implement Sentry Logging for Extension" },
            { name: "Chunk Parsing Failing on Line Changes" },
            { name: "Create Issue Scrape Helper for Testing" },
        ];
    }

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

const BlankSpace = styled.div`
    height: 50vh;

    width: 100vw;
`;
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
