import React, { Component } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

import {
    RiFileList2Fill,
    RiLayoutTop2Fill,
    RiFileExcel2Fill,
    RiFileList2Line,
} from "react-icons/ri";

import { BsCardChecklist } from "react-icons/bs";

import { BiGitCommit } from "react-icons/bi";

import { VscGitPullRequest } from "react-icons/vsc";

import { FiGitBranch, FiGitPullRequest } from "react-icons/fi";

class ContextListItem extends Component {
    renderIcon = () => {
        const { source } = this.props;

        const icon =
            source === "trello" ? (
                <BsCardChecklist />
            ) : (
                <VscGitPullRequest /> //<RiFileList2Line />
            );

        //<BiGitCommit />
        const color = source === "trello" ? "#6762df" : "white"; //"#4284f4";

        const size = source === "trello" ? "2.1rem" : "1.8rem";
        //<RiFileList2Line />;
        return (
            <ContextListItemIcon size={size} color={color}>
                {icon}
            </ContextListItemIcon>
        );
    };

    renderContent = () => {
        const { name } = this.props;

        return (
            <ContextListItemContent>
                <ContextListItemHeader>{name}</ContextListItemHeader>
                <ContextListItemSubHeader>John Smith</ContextListItemSubHeader>
            </ContextListItemContent>
        );
    };

    renderDate = () => {
        return <ContextListItemDate>Nov 25, 2020</ContextListItemDate>;
    };

    render() {
        return (
            <>
                <ContextListItemContainer>
                    {this.renderIcon()}
                    {this.renderContent()}
                    {this.renderDate()}
                </ContextListItemContainer>
            </>
        );
    }
}

export default ContextListItem;

const ContextListItemContainer = styled.div`
    height: 5.3rem;

    &:first-of-type {
        margin-top: 0.7rem;
    }

    width: 100%;

    display: flex;

    padding: 1.15rem 0.5rem;

    padding-right: 1.5rem;

    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }

    position: relative;
`;

const ContextListItemIcon = styled.div`
    height: 3rem;

    min-width: 4rem;

    width: 4rem;

    display: flex;

    justify-content: center;

    margin-top: 0rem;

    font-size: ${(props) => props.size}; /*2.1rem;*/

    /*margin-left: 1rem;*/

    color: ${(props) =>
        props.color}; /* #4284f4*/ /*#4284f4 - doc  #f27448 - card  #0D9D58 - spreadsheet*/

    opacity: 0.7;
`;

const ContextListItemContent = styled.div`
    margin-left: 0.3rem;
`;

const ContextListItemHeader = styled.div`
    font-weight: 600;

    opacity: 0.7;

    font-size: 1.2rem;

    margin-bottom: 0.5rem;

    text-overflow: ellipsis;

    white-space: nowrap;

    overflow: hidden;

    width: calc(100vw - 4rem - 14.5rem);
`;

const ContextListItemSubHeader = styled.div`
    font-weight: 500;

    opacity: 0.55;

    font-size: 1rem;
`;

const ContextListItemDate = styled.div`
    font-weight: 500;

    opacity: 0.55;

    font-size: 1rem;

    margin-left: auto;

    margin-top: 0.1rem;
`;
