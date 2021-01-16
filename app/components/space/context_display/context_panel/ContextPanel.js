import React from "react";

//styles
import styled from "styled-components";

//components
import ContextPanelNavbar from "./ContextPanelNavbar";
import ContextListItem from "./ContextListItem";

//import { Panel } from "../../../../elements/containers";
import { Panel } from "../../../../elements";

const ContextPanel = () => {
    return (
        <ContextPanelContainer>
            <ContextPanelNavbar />
            <ContextPanelList>
                <ContextListItem />
                <ContextListItem />
                <ContextListItem />
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

    max-height: 20rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    padding-bottom: 1rem;
`;
