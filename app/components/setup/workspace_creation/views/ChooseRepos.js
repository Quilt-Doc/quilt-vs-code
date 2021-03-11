import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import { Button, IntegrationItem, SubHeader } from "../../../../elements";

//react-router
import { withRouter } from "react-router-dom";

//react-redux
import { connect } from "react-redux";

class ChooseRepos extends Component {
    constructor(props) {
        super(props);
    }

    handleRepositoryClick = (repo) => {
        const { setActive } = this.props;

        let active = [...this.props.active];

        if (active.includes(repo._id)) {
            active = active.filter((id) => id !== repo._id);
        } else {
            active.push(repo._id);
        }

        setActive(active);
    };

    renderFullName = (name) => {
        let split = name.split("/");

        if (split.length == 2) {
            return `${split[0]} / ${split[1]}`;
        } else {
            const username = split.shift();

            return `${username} / ${split.join("/")}`;
        }
    };

    renderRepositories = () => {
        const { active, repositories } = this.props;

        return repositories.map((repo) => {
            const { _id: repositoryId, fullName } = repo;

            return (
                <IntegrationItem
                    key={repositoryId}
                    type={"github"}
                    name={this.renderFullName(fullName)}
                    active={active.includes(repositoryId)}
                    onClick={() => this.handleRepositoryClick(repo)}
                />
            );
        });
    };

    handleButtonClick = () => {
        const { history, onboarding } = this.props;

        const route = `${
            onboarding ? "/onboard" : ""
        }/create_workspace/choose_name`;

        history.push(route);
    };

    render() {
        return (
            <>
                <SubHeader>
                    Select the repositories you would like to link.
                </SubHeader>
                <RepositoryList>{this.renderRepositories()}</RepositoryList>
                <Button onClick={this.handleButtonClick}>Continue</Button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        github: { repositories },
    } = state;

    return {
        repositories,
    };
};

export default withRouter(connect(mapStateToProps, {})(ChooseRepos));

const RepositoryList = styled.div`
    display: flex;

    flex-direction: column;

    margin-top: 2rem;

    width: 100%;

    max-height: 23rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
