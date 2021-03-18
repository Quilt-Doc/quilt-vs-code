import React from "react";
import styled from "styled-components";

import {
    RiGithubFill,
    RiCheckboxCircleFill,
    RiTrelloFill,
    RiLayoutColumnLine,
} from "react-icons/ri";

const IntegrationItem = ({
    type,
    name,
    active,
    onClick,
    flat,
    marginBottom,
}) => {
    const icons = {
        github: <RiGithubFill />,
        trello: <RiTrelloFill />,
        column: <RiLayoutColumnLine />,
    };

    return (
        <IntegrationItemContainer
            marginBottom={marginBottom}
            flat={flat}
            onClick={onClick}
        >
            <IntegrationItemIcon type={type}>{icons[type]}</IntegrationItemIcon>
            <IntegrationItemName>{name}</IntegrationItemName>
            {active != null && active != undefined && (
                <IntegrationItemCheck active={active}>
                    <RiCheckboxCircleFill />
                </IntegrationItemCheck>
            )}
        </IntegrationItemContainer>
    );
};

export default IntegrationItem;

const IntegrationItemContainer = styled.div`
    display: flex;

    min-height: 3.5rem;

    max-height: 3.5rem;

    align-items: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.3rem;

    border-bottom-left-radius: ${(props) => (props.flat ? "0rem" : "")};

    border-bottom-right-radius: ${(props) => (props.flat ? "0rem" : "")};

    padding: 0rem 1rem;

    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : "1rem"};

    cursor: pointer;
`;

const IntegrationItemIcon = styled.div`
    width: 2.5rem;

    display: flex;

    font-size: 1.8rem;

    opacity: 0.85;
`;

const IntegrationItemName = styled.div`
    font-weight: 500;

    opacity: 0.8;

    font-size: 1.2rem;

    text-overflow: ellipsis;

    white-space: nowrap;

    overflow: hidden;

    width: 80%;

    padding-right: 0.5rem;
`;

const IntegrationItemCheck = styled.div`
    width: 2rem;

    margin-left: auto;

    opacity: ${(props) => (props.active ? 1 : 0.2)};

    color: ${(props) => (props.active ? "#19e5be" : "")};

    margin-top: 0.25rem;
`;
