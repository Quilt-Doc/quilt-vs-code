import React, { Component } from "react";

import WorkspaceButton from "./workspace_button/WorkspaceButton";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//icons
import { RiSearch2Line } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import {
    IoLayersOutline,
    IoTerminal,
    IoTerminalOutline,
} from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import {
    HiDuplicate,
    HiOutlineDuplicate,
    HiOutlineTerminal,
    HiSearch,
} from "react-icons/hi";
import { BsTerminal } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
//router
import { withRouter } from "react-router-dom";
import { CgSearch, CgTerminal } from "react-icons/cg";

class SpaceNavbar extends Component {
    constructor(props) {
        super(props);
    }

    renderButtons = () => {
        const {
            location: { pathname },
            history,
            match,
        } = this.props;

        let buttonIdentifier;

        const split = pathname.split("/");

        if (split.length > 3) {
            buttonIdentifier = split[3];
        }

        const { workspaceId } = match.params;

        /*
               search: {
                icon: <RiSearch2Line />,
                fontSize: "2.1rem",
            },
        */

        const buttonData = {
            blame: {
                icon: <BsTerminal />, //<VscLibrary />,
                fontSize: "2rem",
                type: "left",
            },
            context: {
                icon: <BiCopy />, //<IoLayersOutline />,
                fontSize: "2.1rem", //2rem
                type: "right",
            },
        };

        return Object.keys(buttonData).map((key) => {
            const { icon, fontSize, type } = buttonData[key];

            return (
                <SpaceNavbarMode
                    key={key}
                    onClick={() => history.push(`/space/${workspaceId}/${key}`)}
                    active={key == buttonIdentifier}
                    fontSize={fontSize}
                    type={type}
                >
                    {icon}
                </SpaceNavbarMode>
            );
        });
    };

    render() {
        return (
            <SpaceNavbarContainer>
                <WorkspaceButton />
                <SpaceNavbarButtonsContainer>
                    {this.renderButtons()}
                </SpaceNavbarButtonsContainer>
            </SpaceNavbarContainer>
        );
    }
}

export default withRouter(SpaceNavbar);

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

const SpaceNavbarMode = styled.div`
    height: 3.5rem; /*2.8*/

    width: 6rem;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7rem")};

    opacity: ${(props) => (props.active ? 1 : 0.4)};

    border-radius: ${(props) =>
        props.type == "left"
            ? "0.45rem 0rem 0rem 0.45rem"
            : "0rem 0.45rem 0.45rem 0rem"};

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
    /*
border-bottom: ${(props) =>
        props.active
            ? `1px solid ${chroma(props.theme.TEXT_COLOR).alpha(0.9)}`
            : "1px solid transparent"};
*/

    &:hover {
        opacity: ${(props) => (props.active ? 1 : 0.7)};
    }

    cursor: pointer;

    transition: opacity 0.1s ease-in;

    /*background-color: ${(props) =>
        props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};*/
    /*

    opacity: 0.9;

    border: ${(props) =>
        props.active ? `1px solid ${props.theme.SECONDARY_COLOR}` : ""};
*/
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
