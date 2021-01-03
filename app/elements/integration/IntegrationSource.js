import React from "react";
import styled from "styled-components";

//icons
import { RiGithubFill, RiGitlabFill } from "react-icons/ri";
import { IoLogoBitbucket } from "react-icons/io";

// INTEGRATION SOURCE COMPONENT
const IntegrationSource = ({ inactive, type, onClick }) => {
    const icons = {
        github: <RiGithubFill />,
        bitbucket: <IoLogoBitbucket />,
        gitlab: <RiGitlabFill />,
    };

    return (
        <IntegrationSourceContainer onClick={onClick} inactive={inactive}>
            <IntegrationSourceIcon>{icons[type]}</IntegrationSourceIcon>
        </IntegrationSourceContainer>
    );
};

export default IntegrationSource;

const IntegrationSourceContainer = styled.div`
    height: 4.5rem;

    width: 4.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    display: flex;

    align-items: center;

    justify-content: center;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    border-radius: 0.3rem;

    margin-right: 2rem;

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

    font-size: 2.2rem;
`;
