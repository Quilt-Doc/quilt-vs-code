import React from "react";

import styled from "styled-components";

import chroma from "chroma-js";

import {
    RiSearchLine,
    RiMenu4Line,
    RiStackFill,
    RiHome2Line,
    RiHome2Fill,
} from "react-icons/ri";
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
                <SpaceNavbarButton>
                    <RiHome2Fill />
                </SpaceNavbarButton>
            </SpaceNavbarButtonsContainer>
        </SpaceNavbarContainer>
    );
};

export default SpaceNavbar;

const SpaceNavbarContainer = styled.div`
    display: flex;

    align-items: center;

    /*justify-content: center;*/
`;

const SpaceNavbarButtonsContainer = styled.div`
    padding-top: 0rem;

    padding: 0.3rem 1rem;

    display: flex;

    align-items: center;

    margin-left: auto;

    /*   background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};*/

    border-radius: 0.5rem;
`;

const SpaceNavbarButton = styled.div`
    margin-right: 2.3rem;

    height: 2.8rem; /*2.8*/

    width: 2.8rem;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 1.7rem;

    opacity: ${(props) => (props.active ? 1 : 0.4)};

    /*
    border-bottom: ${(props) =>
        props.active
            ? `1px solid ${chroma(props.theme.TEXT_COLOR).alpha(0.9)}`
            : "1px solid transparent"};
    */

    &:hover {
        opacity: 1;
    }

    cursor: pointer;

    transition: opacity 0.1s ease-in;

    &:last-of-type {
        margin-right: 0rem;
    }
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
