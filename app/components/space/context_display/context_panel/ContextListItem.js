import React, { Component } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

import {
    RiFileList2Fill,
    RiLayoutTop2Fill,
    RiFileExcel2Fill,
    RiFileList2Line,
    RiFile2Line,
} from "react-icons/ri";

import { BsCardChecklist } from "react-icons/bs";

import { BiGitCommit } from "react-icons/bi";

import { VscGitPullRequest } from "react-icons/vsc";

import { FiGitBranch, FiGitPullRequest } from "react-icons/fi";
import { SubHeader, Header } from "../../../../elements";

class ContextListItem extends Component {
    renderIcon = () => {
        const { source, model } = this.props;

        const metadata = {
            tickets: {
                icon: <BsCardChecklist style={{ marginLeft: "-0.1rem" }} />,
                color: "rgb(93, 106, 210)",
                top: "0.13rem",
                size: "2.2rem",
            },
            commits: {
                icon: <BiGitCommit />,

                top: "0.04rem",
                color: "white",
            },
            pullRequests: {
                icon: <VscGitPullRequest />,
                color: "rgb(77,183,130)",
                top: "0.19rem",
            },
            documents: {
                icon: <RiFile2Line />,
                color: "#58a5ff",
            },
            branches: {
                icon: <FiGitBranch />,
                color: "white",
            },
        };

        const { color, icon, top, size, left } = metadata[model];
        //<BiGitCommit />
        //const color = source === "trello" ? "#6762df" : "white"; //"#4284f4";
        //const size = source === "trello" ? "2.1rem" : "1.8rem";
        //<RiFileList2Line />;

        return (
            <ContextListItemIcon
                left={left}
                size={size}
                top={top}
                color={color}
            >
                {icon}
            </ContextListItemIcon>
        );
    };

    renderContent = () => {
        const { name } = this.props;

        return (
            <ContextListItemContent>
                <ContextListItemHeader noWrap={true}>
                    {name}
                </ContextListItemHeader>
                <ContextListItemSubHeader noWrap={true}>
                    John Smith
                </ContextListItemSubHeader>
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
    height: 5.8rem;

    width: 100%;

    display: flex;

    padding: 0.5rem 1.7rem;

    padding-top: 0.8rem;

    padding-right: 1.6rem;

    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }

    position: relative;
`;

const ContextListItemIcon = styled.div`
    height: 3rem;

    min-width: 3.4rem;

    width: 3.4rem;

    display: flex;

    margin-top: ${(props) => (props.top ? props.top : "0rem")};

    font-size: ${(props) => (props.size ? props.size : "2.1rem")}; /*2.1rem;*/

    margin-left: ${(props) => (props.left ? props.left : "0.5rem")};

    color: ${(props) =>
        props.color}; /* #4284f4*/ /*#4284f4 - doc  #f27448 - card  #0D9D58 - spreadsheet*/

    opacity: 0.7;
`;

const ContextListItemContent = styled.div`
    height: 100%;

    width: 100%;
`;

const ContextListItemHeader = styled(SubHeader)`
    margin-bottom: 0.2rem;

    width: calc(100vw - 4rem - 18rem);
`;

/*

  font-weight: 600;

    opacity: 0.7;

    font-size: 1.2rem;

    margin-bottom: 0.5rem;

    text-overflow: ellipsis;

    white-space: nowrap;

    overflow: hidden;

    width: calc(100vw - 4rem - 14.5rem);*/

const ContextListItemSubHeader = styled(SubHeader)`
    font-weight: 500;

    opacity: 0.6;

    font-size: 1.1rem;
`;

const ContextListItemDate = styled.div`
    font-weight: 500;

    opacity: 0.6;

    font-size: 1.1rem;

    margin-left: auto;

    margin-top: 0.46rem;

    min-width: 8rem;
`;
