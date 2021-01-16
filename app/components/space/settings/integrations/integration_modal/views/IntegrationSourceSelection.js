import React, { Component } from "react";

import styled from "styled-components";

import { Header, IntegrationSource } from "../../../../../../elements";

class IntegrationSourceSelection extends Component {
    handleClick = (integration) => {
        const { setIntegration, changePage } = this.props;

        setIntegration(integration);

        changePage(1);
    };

    renderSources = () => {
        let JSX = [];

        const integrations = ["google-drive", "trello", "jira"];

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
                <IntegrationsContainer>
                    {this.renderSources()}
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
`;

const IntegrationsContainer = styled.div`
    height: 100%;

    width: 100%;

    display: flex;

    flex-direction: column;

    padding-top: 2rem;

    /*padding-bottom: 1rem;*/
`;
