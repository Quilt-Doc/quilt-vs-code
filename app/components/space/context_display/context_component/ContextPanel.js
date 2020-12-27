import React from "react";

//styles
import styled from "styled-components";

//components
import ContextPanelNavbar from "./ContextPanelNavbar";
import ContextListItem from "./ContextListItem";
import { Panel } from "../../../../elements/containers";

const ContextPanel = () => {
    return (
        <ContextPanelContainer>
            <ContextPanelNavbar />
            <ContextPanelList>
                <ContextListItem />
            </ContextPanelList>
        </ContextPanelContainer>
    );
};

export default ContextPanel;

//PANEL
const ContextPanelContainer = styled(Panel)`
    margin-top: 1.5rem;
`;

const ContextPanelList = styled.div`
    display: flex;

    flex-direction: column;

    max-height: 18rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    padding-bottom: 1rem;
`;
