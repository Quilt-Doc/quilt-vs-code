import React, { useState } from "react";

//styles
import styled from "styled-components";

//components
import {
    Panel,
    Header,
    SubHeader,
    IntegrationItem,
} from "../../../../elements";
import IntegrationModal from "./integration_modal/IntegrationModal";

//icons
import { CgMathPlus } from "react-icons/cg";

const IntegrationPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <IntegrationPanelContainer>
                <IntegrationPanelNavbar>
                    <Header>Integrations</Header>
                    <IntegrationPanelAddButton
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        <CgMathPlus />
                    </IntegrationPanelAddButton>
                </IntegrationPanelNavbar>
                <IntegrationTypeBlock>
                    <SubHeader marginBottom={"0.8rem"}>Code Hosting</SubHeader>
                    <IntegrationItem
                        type={"github"}
                        name={"Quilt Docs / quilt-vs-code"}
                    />
                </IntegrationTypeBlock>

                <IntegrationTypeBlock>
                    <SubHeader marginBottom={"0.8rem"}>
                        Issue Providers
                    </SubHeader>
                    <IntegrationItem type={"trello"} name={"Quilt Product"} />
                </IntegrationTypeBlock>
            </IntegrationPanelContainer>
            {isModalOpen && (
                <IntegrationModal closeModal={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default IntegrationPanel;

const IntegrationPanelAddButton = styled.div`
    height: 3.5rem;

    width: 3.5rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*margin-left: auto;*/

    position: absolute;

    right: 0;

    top: -29%;

    font-size: 1.55rem;

    border-radius: 50%;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }

    cursor: pointer;
`;

const IntegrationPanelNavbar = styled.div`
    display: flex;

    position: relative;
    /*align-items: center;*/

    margin-bottom: 1rem;
`;

const IntegrationTypeBlock = styled.div`
    margin-bottom: 1.5rem;

    &:last-of-type {
        margin-bottom: 0rem;
    }
`;

const IntegrationPanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;
`;