import React from "react";

import styled from "styled-components";

import chroma from "chroma-js";

import {
    RiSearchLine,
    RiMenu4Line,
    RiStackFill,
    RiHomeLine,
    RiHome2Fill,
    RiSettings3Line,
    RiSearch2Line,
    RiStackLine,
    RiHomeGearLine,
} from "react-icons/ri";

import { IoLayers, IoLayersOutline } from "react-icons/io5";
import { IoMdBook } from "react-icons/io";

import { FiLayers, FiSettings, FiSearch, FiBookOpen } from "react-icons/fi";

import { GrIntegration } from "react-icons/gr";
import { CgSearch } from "react-icons/cg";
import { HiOutlineViewGrid } from "react-icons/hi";

const SpaceNavbar = () => {
    return (
        <SpaceNavbarContainer>
            <WorkspaceButton>Q</WorkspaceButton>
            <SpaceNavbarButtonsContainer>
                <SpaceNavbarButton fontSize={"2.1rem"}>
                    <RiSearch2Line />
                </SpaceNavbarButton>
                <SpaceNavbarButton fontSize={"2rem"} active={true}>
                    <IoLayersOutline />
                </SpaceNavbarButton>
                <SpaceNavbarButton fontSize={"2.1rem"}>
                    <IoMdBook />
                </SpaceNavbarButton>
                <SpaceNavbarButton fontSize={"2.1rem"}>
                    <HiOutlineViewGrid />
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

    /*background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};*/
`;

const SpaceNavbarButton = styled.div`
    margin-right: 2.2rem;

    height: 2.8rem; /*2.8*/

    width: 2.8rem;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7rem")};

    opacity: ${(props) => (props.active ? 1 : 0.4)};

    border-radius: 0.5rem;

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

    /*background-color: ${(props) =>
        props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};*/
    /*
    opacity: 0.9;

    border: ${(props) =>
        props.active ? `1px solid ${props.theme.SECONDARY_COLOR}` : ""};
    */
`;

const WorkspaceButton = styled(SpaceNavbarButton)`
    font-weight: 300;

    font-size: 1.6rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    opacity: 0.9;
`;
/*
 background-color: ${chroma("#090B10").set("hsl.l", "+0.08")};*/
