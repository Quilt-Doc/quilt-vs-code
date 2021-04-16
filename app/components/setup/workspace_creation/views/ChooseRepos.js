import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import { Button, IntegrationItem, SubHeader } from "../../../../elements";
import RepositorySearchMenu from "./RepositorySearchMenu";

//react-router
import { withRouter } from "react-router-dom";

//react-redux
import { connect } from "react-redux";

//icons
import { MdPublic } from "react-icons/md";
import {
    RiGitRepositoryLine,
    RiGitRepositoryPrivateLine,
} from "react-icons/ri";

//actions
import { searchPublicGithubRepositories } from "../../../../actions/GithubActions";

class ChooseRepos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPublic: true,
            publicRepositories: [],
        };
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

    renderRepositories = (isActive) => {
        const { isPublic, publicRepositories } = this.state;

        let { active, repositories } = this.props;

        let repos = repositories;

        if (isPublic) repos = publicRepositories;

        if (isActive) {
            repos = repos.filter((repo) => active.includes(repo._id));
        }

        return repos.map((repo) => {
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

    renderRepoModeButton = () => {
        const { isPublic } = this.state;

        const buttonText = isPublic ? "Switch to Private" : "Switch to Public";

        const icon = !isPublic ? (
            <MdPublic
                style={{
                    marginRight: "0.8rem",
                    fontSize: "1.7rem",
                    marginTop: "-0.1rem",
                }}
            />
        ) : (
            <RiGitRepositoryPrivateLine
                style={{
                    marginRight: "0.8rem",
                    fontSize: "1.6rem",
                    marginTop: "-0.15rem",
                }}
            />
        );
        return (
            <ModeButtonContainer>
                <ModeButton
                    onClick={() => this.setState({ isPublic: !isPublic })}
                >
                    {icon}
                    <SubHeader>{buttonText}</SubHeader>
                </ModeButton>
            </ModeButtonContainer>
        );
    };

    searchPublicRepositories = async (query) => {
        const { searchPublicGithubRepositories } = this.props;

        const foundRepos = await searchPublicGithubRepositories({ query });

        this.setState({
            publicRepositories: foundRepos,
        });
    };

    renderPrivateBody = () => {
        const { active } = this.props;

        const placeholder = (
            <PlaceholderContainer>
                <PlaceholderIcon>
                    <RiGitRepositoryLine />
                </PlaceholderIcon>
                <SubHeader>No Repositories Selected</SubHeader>
            </PlaceholderContainer>
        );

        const activeRepoList = (
            <RepositoryList>{this.renderRepositories(true)}</RepositoryList>
        );

        const bottomJSX = active.length == 0 ? placeholder : activeRepoList;

        return (
            <>
                <RepositorySearchMenu
                    search={this.searchPublicRepositories}
                    renderRepositories={this.renderRepositories}
                />
                {bottomJSX}
            </>
        );
    };

    handleButtonClick = () => {
        const { history, onboarding } = this.props;

        const route = `${
            onboarding ? "/onboard" : ""
        }/create_workspace/choose_name`;

        history.push(route);
    };

    renderContent = () => {
        const { isPublic } = this.state;

        return !isPublic ? (
            <RepositoryList>{this.renderRepositories()}</RepositoryList>
        ) : (
            this.renderPrivateBody()
        );
    };

    render() {
        const { isPublic } = this.state;

        return (
            <>
                <SubHeader>
                    {!isPublic
                        ? "Select the repositories you would like to link."
                        : "Search and select any public repository on Github."}
                </SubHeader>
                {this.renderRepoModeButton()}
                {this.renderContent()}
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

export default withRouter(
    connect(mapStateToProps, { searchPublicGithubRepositories })(ChooseRepos)
);

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

const ModeButtonContainer = styled.div`
    display: flex;

    align-items: center;

    margin-top: 1.5rem;

    width: 100%;
`;

const ModeButton = styled.div`
    display: inline-flex;

    min-height: 3.5rem;

    max-height: 3.5rem;

    align-items: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.45rem;

    padding: 0rem 1.2rem;

    cursor: pointer;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    &:hover {
        background-color: ${(props) =>
            props.theme.PRIMARY_ACCENT_COLOR_SHADE_2};
    }
    /*position: absolute;*/
`;

const SearchbarContainer = styled.div`
    height: 3.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    width: 100%;

    border-radius: 0.4rem;

    margin-top: 2rem;

    display: flex;

    align-items: center;

    padding: 0 1rem;

    max-width: 40rem;

    position: relative;
`;

const SearchbarIconContainer = styled.div`
    display: flex;

    align-items: center;

    width: 2.5rem;

    font-size: 1.7rem;
`;

const SearchbarInput = styled.input`
    width: calc(100% - 2rem);

    outline: none;

    font-weight: 500;

    font-size: 1.2rem;

    color: ${(props) => props.theme.TEXT_COLOR};

    border: none;

    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    &:focus {
        border: none;

        outline: none;
    }

    &::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;

        color: ${(props) => props.theme.TEXT_COLOR};

        font-weight: 500;

        opacity: 0.6;
    }
`;

const PlaceholderContainer = styled.div`
    text-align: center;

    margin-top: 4rem;

    margin-bottom: 1rem;
`;

const PlaceholderIcon = styled.div`
    font-size: 3rem;

    margin-bottom: 0.5rem;

    opacity: 0.8;
`;

/*
<SearchbarContainer>
<SearchbarIconContainer>
    <CgSearch/>
</SearchbarIconContainer>
<SearchbarInput/>
</SearchbarContainer>
*/
