import React from "react";
import styled from "styled-components";

//icons
import { RiGithubFill, RiGitlabFill, RiTrelloFill } from "react-icons/ri";
import { IoLogoBitbucket } from "react-icons/io";
import { DiGoogleDrive } from "react-icons/di";
import { SiJira, SiNotion, SiAsana, SiConfluence } from "react-icons/si";

// INTEGRATION SOURCE COMPONENT
const IntegrationSource = ({
    inactive,
    type,
    onClick,
    width,
    height,
    borderRadius,
    large,
}) => {
    const icons = {
        github: <RiGithubFill />,
        bitbucket: <IoLogoBitbucket />,
        gitlab: <RiGitlabFill />,
        google: <DiGoogleDrive />,
        trello: <RiTrelloFill />,
        jira: <SiJira />,
        notion: <SiNotion />,
        asana: <SiAsana />,
        confluence: <SiConfluence />,
    };

    const sizes = {
        github: {
            large: "2.7rem",
            normal: "2.4rem",
        },
        bitbucket: {
            large: "2.7rem",
            normal: "2.4rem",
        },
        gitlab: {
            large: "2.7rem",
            normal: "2.4rem",
        },
        jira: {
            large: "2.3rem",
            normal: "2.1rem",
        },
        trello: {
            large: "2.8rem",
            normal: "2.4rem",
        },
        asana: {
            large: "2.4rem",
            normal: "2.1rem",
        },
        google: {
            large: "3.1rem",
            normal: "2.7rem",
        },
        notion: {
            large: "2.6rem",
            normal: "2.3rem",
        },
        confluence: {
            large: "2.3rem",
            normal: "2.1rem",
        },
    };

    const fontSize = sizes[type][large ? "large" : "normal"];
    //icons

    const colors = {
        bitbucket: "#2684ff",
        trello: "#1776c0",
        jira: "#2684ff",
        google: "#33a853",
    };

    return (
        <IntegrationSourceContainer
            width={width}
            height={height}
            borderRadius={borderRadius}
            onClick={onClick}
            inactive={inactive}
        >
            <IntegrationSourceIcon color={colors[type]} fontSize={fontSize}>
                {icons[type]}
            </IntegrationSourceIcon>
        </IntegrationSourceContainer>
    );
};

export default IntegrationSource;

const IntegrationSourceContainer = styled.div`
    height: ${(props) => (props.height ? props.height : "4.5rem")};

    width: ${(props) => (props.width ? props.width : "4.5rem")};

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    display: flex;

    align-items: center;

    justify-content: center;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    border-radius: ${(props) =>
        props.borderRadius ? props.borderRadius : "0.3rem"};

    margin-right: ${(props) =>
        props.marginRight ? props.marginRight : "2rem"};

    opacity: ${(props) => (props.inactive ? 0.5 : 1)};

    &:last-of-type {
        margin-right: 0rem;
    }

    cursor: pointer;
`;

const IntegrationSourceIcon = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    font-size: ${(props) => props.fontSize};
`;
