import React, { useState } from "react";

//styles
import styled from "styled-components";

//react-redux
import { connect } from "react-redux";

//actions
import {
    checkGithubInstallations,
    retrieveGithubRepositories,
} from "../../../../actions/GithubActions";

//vscode api
import vscode from "../../../../vscode/vscode";

//icons
import { RiGithubFill, RiGitlabFill } from "react-icons/ri";
import { IoLogoBitbucket } from "react-icons/io";

//types
import { OPEN_BROWSER } from "../../../../vscode/types/messageTypes";

const ChooseProvider = ({
    changePage,
    checkGithubInstallations,
    user,
    installations,
    retrieveGithubRepositories,
}) => {
    const { _id: userId } = user;

    const [pollInterval, setPollInterval] = useState(null);

    const [count, setCount] = useState(0);

    const handleSourceClick = useMemo(
        () => async (index) => {
            if (index !== 0) return;

            let installed = await checkInstall();

            if (installed) {
                await retrieveRepositoryChoices();

                changePage(1);
            } else {
                const newInterval = setInterval(pollInstall, 3000);

                setPollInterval(newInterval);

                openWindow();
            }
        },
        [
            checkInstall,
            retrieveRepositoryChoices,
            changePage,
            pollInstall,
            openWindow,
        ]
    );

    const checkInstall = useMemo(
        () => async () => {
            await checkGithubInstallations({ userId, platform: "github" });

            console.log("INSTALLATIONS", installations);

            let installs = installations.filter(
                (inst) =>
                    inst.account.type === "User" &&
                    inst.account.id == user.profileId
            );

            console.log("INSTALLS", installs);

            return installs.length !== 0;
        },
        [checkGithubInstallations, installations, user]
    );

    const retrieveRepositoryChoices = useMemo(
        () => async () => {
            await retrieveGithubRepositories({
                installationIds: installations.map(
                    (installObj) => installObj.id
                ),
                userId: user._id.toString(),
            });
        },
        [retrieveGithubRepositories, installations, user]
    );

    const pollInstall = useMemo(
        () => async () => {
            if (count === 90) {
                clearInterval(pollInterval);

                return false;
            } else {
                setCount(count + 1);

                let installed = await checkInstall();

                if (installed) {
                    clearInterval(pollInterval);

                    await retrieveRepositoryChoices();

                    changePage(1);
                }

                return true;
            }
        },
        [
            pollInterval,
            count,
            checkInstall,
            retrieveRepositoryChoices,
            changePage,
        ]
    );

    const openWindow = () => {
        const url =
            "https://github.com/apps/get-quilt/installations/new?state=installing";

        vscode.postMessage({
            type: OPEN_BROWSER,
            payload: {
                url,
            },
        });
    };

    const renderChoices = () => {
        const icons = [<RiGithubFill />, <IoLogoBitbucket />, <RiGitlabFill />];

        const integrationIcons = icons.map((icon, i) => {
            return (
                <IntegrationSource
                    key={i}
                    onClick={() => handleSourceClick(i)}
                    inactive={i !== 0}
                >
                    <IntegrationIcon>{icon}</IntegrationIcon>
                </IntegrationSource>
            );
        });

        return <IntegrationRow>{integrationIcons}</IntegrationRow>;
    };

    return (
        <>
            <SubHeader>
                Get started in three steps! First, select your code hosting
                service.
            </SubHeader>
            {renderChoices()}
        </>
    );
};

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

export default connect(mapStateToProps, {
    checkGithubInstallations,
    retrieveGithubRepositories,
})(ChooseProvider);

const SubHeader = styled.div`
    font-size: 1.2rem;

    font-weight: 500;

    line-height: 1.6;

    opacity: 0.7;

    margin-bottom: 2rem;
`;

const IntegrationIcon = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 2.2rem;
`;

const IntegrationRow = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;
`;

const IntegrationSource = styled.div`
    height: 4.5rem;

    width: 4.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    display: flex;

    align-items: center;

    justify-content: center;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    border-radius: 0.3rem;

    margin-right: 2rem;

    opacity: ${(props) => (props.inactive ? 0.5 : 1)};

    &:last-of-type {
        margin-right: 0rem;
    }

    cursor: pointer;
`;
