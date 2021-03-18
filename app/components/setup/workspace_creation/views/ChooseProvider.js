import React, { Component } from "react";

//components
import { IntegrationSource, SubHeader } from "../../../../elements";

//styles
import styled from "styled-components";

//react-redux
import { connect } from "react-redux";

//react-router
import { withRouter } from "react-router-dom";

//actions
import {
    checkGithubInstallations,
    retrieveGithubRepositories,
} from "../../../../actions/GithubActions";

//vscode api
import vscode from "../../../../vscode/vscode";

//types
import { OPEN_BROWSER } from "../../../../vscode/types/messageTypes";

class ChooseProvider extends Component {
    constructor(props) {
        super(props);

        this.count = 0;

        this.pollInterval = null;
    }

    handleSourceClick = async (index) => {
        if (index !== 0) return;

        let installed = await this.checkInstall();

        console.log("INSTALLED");

        if (installed) {
            await this.retrieveRepositoryChoices();

            const { history, onboarding } = this.props;

            const route = `${
                onboarding ? "/onboard" : ""
            }/create_workspace/choose_repos`;

            history.push(route);
        } else {
            this.pollInterval = setInterval(this.pollInstall, 3000);

            this.openWindow();
        }
    };

    checkInstall = async () => {
        const { checkGithubInstallations, user } = this.props;

        const { _id: userId, profileId } = user;

        await checkGithubInstallations({ userId, platform: "github" });

        const { installations } = this.props;

        console.log("NORMAL INSTALLS", installations);

        let installs = installations.filter(
            (inst) =>
                inst.account.type === "User" && inst.account.id == profileId
        );

        console.log("INSTALLS", installs);

        return installs.length !== 0;
    };

    retrieveRepositoryChoices = async () => {
        const {
            retrieveGithubRepositories,
            user: { _id: userId },
            installations,
        } = this.props;

        console.log("INSTALLATIONS", installations);

        await retrieveGithubRepositories({
            installationIds: installations.map((installObj) => installObj.id),
            userId,
        });
    };

    pollInstall = async () => {
        if (this.count === 90) {
            clearInterval(this.pollInterval);

            return false;
        } else {
            this.count += 1;

            let installed = await this.checkInstall();

            if (installed) {
                clearInterval(this.pollInterval);

                await this.retrieveRepositoryChoices();

                const { history, onboarding } = this.props;

                const route = `${
                    onboarding ? "/onboard" : ""
                }/create_workspace/choose_repos`;

                history.push(route);
            }

            return true;
        }
    };

    openWindow = () => {
        const url =
            "https://github.com/apps/get-quilt/installations/new?state=installing";

        vscode.postMessage({
            type: OPEN_BROWSER,
            payload: {
                url,
            },
        });
    };

    renderChoices = () => {
        const choices = ["github", "bitbucket", "gitlab"];

        const integrationIcons = choices.map((choice, i) => {
            return (
                <IntegrationSource
                    key={i}
                    onClick={() => this.handleSourceClick(i)}
                    inactive={i !== 0}
                    type={choice}
                />
            );
        });

        return <IntegrationRow>{integrationIcons}</IntegrationRow>;
    };

    render() {
        return (
            <>
                <SubHeader>
                    Get started in three steps! First, select your code hosting
                    service.
                </SubHeader>
                {this.renderChoices()}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        auth: { user },
        github: { installations, repositories },
    } = state;

    return {
        user,
        installations,
        repositories,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        checkGithubInstallations,
        retrieveGithubRepositories,
    })(ChooseProvider)
);

const IntegrationRow = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    margin-top: 3rem;
`;
