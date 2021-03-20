import React, { Component } from "react";

import styled from "styled-components";

import {
    Header,
    IntegrationSource,
    SubHeader,
} from "../../../../../../../elements";

class IntegrationSourceSelection extends Component {
    handleClick = (integration) => {
        const { setIntegration, changePage } = this.props;

        setIntegration(integration);

        changePage(1);
    };

    renderVersionControl = () => {
        const choices = ["github", "bitbucket", "gitlab"];

        const integrationIcons = choices.map((choice, i) => {
            return (
                <IntegrationSource
                    large={true}
                    height={"5.1rem"}
                    width={"5.1rem"}
                    key={i}
                    onClick={() => {
                        if (i == 0) {
                            this.handleClick(choice);
                        }
                    }}
                    inactive={i !== 0}
                    type={choice}
                />
            );
        });

        return (
            <>
                <OpaqueSubHeader>Version Control</OpaqueSubHeader>
                <IntegrationRow>{integrationIcons}</IntegrationRow>
            </>
        );
    };

    renderProjectManagement = () => {
        const choices = ["jira", "trello", "asana"];

        const currentChoices = new Set(["jira", "trello"]);

        const integrationIcons = choices.map((choice, i) => {
            const active = currentChoices.has(choice);

            return (
                <IntegrationSource
                    large={true}
                    height={"5.1rem"}
                    width={"5.1rem"}
                    key={i}
                    onClick={() => {
                        if (active) {
                            this.handleClick(choice);
                        }
                    }}
                    inactive={!active}
                    type={choice}
                />
            );
        });

        return (
            <>
                <OpaqueSubHeader>Project Management</OpaqueSubHeader>
                <IntegrationRow>{integrationIcons}</IntegrationRow>
            </>
        );
    };

    renderDocumentation = () => {
        const choices = ["google", "notion", "confluence"];

        const currentChoices = new Set(["google"]);

        const integrationIcons = choices.map((choice, i) => {
            const active = currentChoices.has(choice);

            return (
                <IntegrationSource
                    large={true}
                    height={"5.1rem"}
                    width={"5.1rem"}
                    key={i}
                    onClick={() => {
                        if (active) {
                            this.handleClick(choice);
                        }
                    }}
                    inactive={!active}
                    type={choice}
                />
            );
        });

        return (
            <>
                <OpaqueSubHeader>Documentation</OpaqueSubHeader>
                <IntegrationRow>{integrationIcons}</IntegrationRow>
            </>
        );
    };

    renderSources = () => {
        let JSX = [];

        const integrations = ["google", "trello", "jira"];

        let integrationsJSX = [];

        integrations.map((integration, i) => {
            integrationsJSX.push(
                <IntegrationSource
                    onClick={() => this.handleClick(integration)}
                    key={integration}
                    type={integration}
                />
            );

            let index = i + 1;

            if (index % 3 === 0 || index === integrations.length) {
                JSX.push(
                    <IntegrationRow key={index}>
                        {integrationsJSX}
                    </IntegrationRow>
                );

                integrationsJSX = [];
            }
        });

        return JSX;
    };

    render() {
        return (
            <>
                <Header>Add an Integration</Header>
                <SubHeader>Select a source of integration data.</SubHeader>
                <IntegrationsContainer>
                    {this.renderVersionControl()}
                    {this.renderProjectManagement()}
                    {this.renderDocumentation()}
                </IntegrationsContainer>
            </>
        );
    }
}

export default IntegrationSourceSelection;

const IntegrationRow = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    margin-bottom: 2.8rem;
`;

const IntegrationsContainer = styled.div`
    height: 100%;

    width: 100%;

    display: flex;

    flex-direction: column;

    padding-top: 2rem;

    /*padding-bottom: 1rem;*/
`;

const OpaqueSubHeader = styled(SubHeader)`
    opacity: 1;

    margin-bottom: 1.5rem;

    text-align: center;

    width: 100%;
`;
