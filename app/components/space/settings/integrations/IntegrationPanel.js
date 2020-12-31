import Reac, { useState } from "react";

//styles
import styled from "styled-components";

//components
import { Panel } from "../../../../elements/elements";

//icons
import { RiTrelloFill, RiGithubFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";

const IntegrationPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <IntegrationPanelContainer>
                <IntegrationPanelNavbar>
                    <IntegrationPanelHeader>
                        Integrations
                    </IntegrationPanelHeader>
                    <IntegrationPanelAddButton>
                        <FiPlus
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        />
                    </IntegrationPanelAddButton>
                </IntegrationPanelNavbar>

                <IntegrationTypeBlock>
                    <IntegrationPanelSubHeader>
                        Code Hosting
                    </IntegrationPanelSubHeader>
                    <IntegrationSourceItem>
                        <IntegrationSourceIcon>
                            <RiGithubFill />
                        </IntegrationSourceIcon>
                        <IntegrationSourceName>
                            Quilt Docs / quilt-vs-code
                        </IntegrationSourceName>
                    </IntegrationSourceItem>
                </IntegrationTypeBlock>

                <IntegrationTypeBlock>
                    <IntegrationPanelSubHeader>
                        Issue Providers
                    </IntegrationPanelSubHeader>
                    <IntegrationSourceItem>
                        <IntegrationSourceIcon>
                            <RiTrelloFill />
                        </IntegrationSourceIcon>
                        <IntegrationSourceName>
                            Quilt Product
                        </IntegrationSourceName>
                    </IntegrationSourceItem>
                </IntegrationTypeBlock>
            </IntegrationPanelContainer>
            {isModalOpen && <IntegrationModal />}
        </>
    );
};

export default IntegrationPanel;

const IntegrationPanelHeader = styled.div`
    font-weight: 500;

    opacity: 0.7;

    font-size: 1.1rem;

    text-transform: uppercase;
`;

const IntegrationPanelAddButton = styled.div`
    height: 2.5rem;

    width: 2.5rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    margin-left: auto;

    font-size: 1.5rem;

    border-radius: 0.3rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};
`;

const IntegrationPanelNavbar = styled.div`
    display: flex;

    align-items: center;

    margin-bottom: 1rem;
`;

const IntegrationTypeBlock = styled.div`
    margin-bottom: 1.5rem;

    &:last-of-type {
        margin-bottom: 0rem;
    }
`;

const IntegrationSourceItem = styled.div`
    display: flex;

    height: 3.5rem;

    align-items: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.5rem;

    padding: 0rem 1rem;
`;

const IntegrationSourceIcon = styled.div`
    width: 2.5rem;

    display: flex;

    font-size: 1.8rem;

    opacity: 0.85;
`;

const IntegrationSourceName = styled.div`
    font-weight: 500;

    opacity: 0.7;

    font-size: 1.25rem;
`;

const IntegrationPanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 1rem 1rem;
`;

const IntegrationPanelSubHeader = styled.div`
    padding: 1rem 0rem;

    font-weight: 600;

    opacity: 0.7;

    font-size: 1.2rem;

    margin-bottom: 0.5rem;
`;

const IntegrationSourceBlock = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    height: 10rem;

    width: 100%;

    border-radius: 0.5rem;
`;
