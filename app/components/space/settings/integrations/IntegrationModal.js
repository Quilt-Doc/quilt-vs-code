import React, { Component } from "react";

//styles
import styled from "styled-components";

//vscode api
import vscode from "../../../../vscode/vscode";

//components
import { Header, IntegrationSource, Modal } from "../../../../elements";

//constants
import { OPEN_BROWSER } from "../../../../vscode/types/messageTypes";

//react-redux
import { connect } from "react-redux";

//react-router
import { withRouter } from "react-router-dom";

class IntegrationModal extends Component {
    constructor(props) {
        super(props);
    }

    renderSources = () => {
        let JSX = [];

        const {
            user: { _id: userId },
            match,
        } = this.props;

        const { workspaceId } = match.params;

        console.log("WORKSPACEID", workspaceId);

        const integrations = {
            "google-drive": `http://localhost:3001/api/integrations/connect/trello`,
            trello: `http://localhost:3001/api/integrations/connect/trello?workspace_id=${workspaceId}&user_id=${userId}`,
            jira: `http://localhost:3001/api/integrations/connect/trello`,
        };

        let integrationsJSX = [];

        Object.keys(integrations).map((integration, i) => {
            const url = integrations[integration];

            integrationsJSX.push(
                <IntegrationSource
                    key={integration}
                    onClick={() => {
                        vscode.postMessage({
                            type: OPEN_BROWSER,
                            payload: {
                                url,
                            },
                        });
                    }}
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
        const { closeModal } = this.props;

        return (
            <Modal closeModal={closeModal}>
                <Container>
                    <Header>Select to Integrate.</Header>
                    <IntegrationsContainer>
                        {this.renderSources()}
                    </IntegrationsContainer>
                </Container>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        auth: { user },
    } = state;

    return {
        user,
    };
};

export default withRouter(connect(mapStateToProps, {})(IntegrationModal));

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

    padding-bottom: 1rem;
`;

const Container = styled.div`
    padding: 2rem;
`;

/*
 <Item
                        onClick={() => {
                            const ideToken = new Date().getTime();
                            vscode.postMessage({
                                type: OPEN_BROWSER,
                                payload: {
                                    url: `${URL}?ide_token=${ideToken}`,
                                },
                            });
                        }}
                    >
                        <ContextPanelIconContainer>
                            <ContextPanelIcon>
                                <RiTrelloFill />
                            </ContextPanelIcon>
                        </ContextPanelIconContainer>
                        <IntegrationSourceName>Trello</IntegrationSourceName>
                    </Item>*/
