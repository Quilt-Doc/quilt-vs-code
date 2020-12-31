import React from "react";

import styled from "styled-components";

import chroma from "chroma-js";

const BOX_SHADOW_1 =
    "0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12),0 3px 3px -2px rgba(0, 0, 0, 0.4)";

import { RiSearchLine, RiMenu4Line, RiStackFill } from "react-icons/ri";
import { GrIntegration } from "react-icons/gr";

const SpaceNavbar = () => {
    return (
        <SpaceNavbarContainer>
            <SpaceNavbarButtonsContainer>
                <SpaceNavbarButton>
                    <RiSearchLine />
                </SpaceNavbarButton>
                <SpaceNavbarButton active={true}>
                    <RiStackFill />
                </SpaceNavbarButton>
                <WorkspaceButton>F</WorkspaceButton>
            </SpaceNavbarButtonsContainer>
        </SpaceNavbarContainer>
    );
};

export default SpaceNavbar;

const SpaceNavbarContainer = styled.div`
    display: flex;

    align-items: center;
`;

const SpaceNavbarButtonsContainer = styled.div`
    height: 3rem;

    display: flex;

    align-items: center;

    margin-left: auto;
`;

const SpaceNavbarButton = styled.div`
    margin-left: 0.7rem;

    height: 2.8rem;

    width: 2.8rem;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 0.3rem;

    font-size: 1.7rem;

    color: ${(props) => chroma(props.theme.TEXT_COLOR).alpha(0.85)};

    /*background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};*/
    /*
    opacity: 0.9;

    border: ${(props) =>
        props.active ? `1px solid ${props.theme.SECONDARY_COLOR}` : ""};
    */
`;

const WorkspaceButton = styled(SpaceNavbarButton)`
    font-weight: 500;

    font-size: 1.6rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;
/*
 background-color: ${chroma("#090B10").set("hsl.l", "+0.08")};*/
