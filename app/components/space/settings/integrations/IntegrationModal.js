import React from "react";
import styled from "styled-components";
import { Modal } from "../../../../elements";

//icons
import { DiGoogleDrive } from "react-icons/di";
import { RiTrelloFill } from "react-icons/ri";

//vscode api
import vscode from "../../../../vscode/vscode";

import chroma from "chroma-js";

//constants
const TRELLO_ICON_SIZE = "2.1rem";

const IntegrationModal = (props) => {
    const { closeModal } = props;

    const URL = `http://localhost:3001/api/integrations/connect/trello`;
    return (
        <Modal closeModal={closeModal}>
            <Container>
                <IntegrationPanelHeader>
                    Select to Integrate
                </IntegrationPanelHeader>
                <IntegrationsContainer>
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
                    </Item>
                </IntegrationsContainer>
            </Container>
        </Modal>
    );
};

export default IntegrationModal;

const ContextPanelIcon = styled.div`
    font-size: ${TRELLO_ICON_SIZE};

    opacity: 0.85;
`;

const IntegrationPanelHeader = styled.div`
    font-weight: 500;

    opacity: 0.8;

    font-size: 1.3rem;

    width: 100%;
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
    padding: 1rem 1rem;
`;

const Item = styled.div`
    display: flex;

    flex-direction: column;

    align-items: center;
`;

const IntegrationSourceName = styled.div`
    margin-top: 0.8rem;

    font-weight: 500;

    opacity: 0.8;

    font-size: 1.2rem;
`;

const ContextPanelIconContainer = styled.div`
    height: 3.5rem;

    display: flex;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    cursor: pointer;
    /*${chroma("#090B10").set("hsl.l", "+0.18")};*/ /*REPLACE COLOR*/

    align-items: center;

    justify-content: center;

    width: 5rem;

    border-radius: 0.8rem;
`;
