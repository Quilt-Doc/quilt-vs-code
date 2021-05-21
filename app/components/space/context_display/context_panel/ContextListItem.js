import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";

import {
    RiFileList2Fill,
    RiLayoutTop2Fill,
    RiFileExcel2Fill,
    RiFileList2Line,
    RiFile2Line,
} from "react-icons/ri";

import { BsCardChecklist } from "react-icons/bs";

import { BiGitCommit } from "react-icons/bi";

import { VscGitPullRequest, VscGitMerge } from "react-icons/vsc";

import { FiGitBranch } from "react-icons/fi";
import { SubHeader } from "../../../../elements";

class ContextListItem extends Component {
    renderIcon = () => {
        const {
            model,
            item: { state },
        } = this.props;

        const metadata = {
            tickets: {
                icon: <BsCardChecklist style={{ marginLeft: "-0.1rem" }} />,
                color: "rgb(93, 106, 210)",
                /*top: "0.13rem",*/
                size: "2rem",
            },
            commits: {
                icon: <BiGitCommit />,
                top: "0.1rem",
                color: "#f69700",
            },
            pullRequests: {
                icon: state == "MERGED" ? <VscGitMerge /> : <VscGitPullRequest />,
                color:
                    state == "MERGED"
                        ? "#a470f7"
                        : state == "CLOSED"
                        ? "#f85149"
                        : "rgb(77,183,130)",
                //top: "0.19rem",
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

        return (
            <ContextListItemIconContainer>
                <ContextListItemIcon left={left} size={size} top={top} color={color}>
                    {icon}
                </ContextListItemIcon>
            </ContextListItemIconContainer>
        );
    };

    renderFormattedDateString = () => {
        const {
            item: { sourceCreationDate, mergedAt, sourceCloseDate },
            model,
        } = this.props;

        let relevantDate;

        if (model == "pullRequest") {
            if (model.state == "CLOSED") {
                relevantDate = sourceCloseDate;
            } else if (model.state == "MERGED") {
                relevantDate = mergedAt;
            } else {
                relevantDate = sourceCreationDate;
            }
        } else {
            relevantDate = sourceCreationDate;
        }

        const currentDate = new Date();

        relevantDate = new Date(relevantDate);

        let dateString = "";

        const curr = {
            hour: currentDate.getHours(),
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
        };

        const src = {
            hour: relevantDate.getHours(),
            day: relevantDate.getDate(),
            month: relevantDate.getMonth(),
            year: relevantDate.getFullYear(),
        };

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        if (curr.year == src.year) {
            if (curr.month == src.month) {
                if (curr.day == src.day) {
                    dateString = `${curr.hour - src.hour} hours ago`;
                } else {
                    dateString = `${curr.day - src.day} days ago`;
                }
            } else {
                dateString = `${months[src.month]} ${src.day}`;
            }
        } else {
            dateString = `${months[src.month]} ${src.day}, ${src.year}`;
        }

        return dateString;
    };

    acquirePhrase = () => {
        const { item, model } = this.props;

        if (model == "pullRequests") {
            return item.state == "OPEN"
                ? "opened on"
                : item.state == "CLOSED"
                ? "was closed on"
                : "was merged on";
        } else if (model == "tickets") {
            return "created on";
        } else {
            return "committed on";
        }
    };

    renderContent = () => {
        const { item, model } = this.props;

        const { name, sourceId, creator } = item;

        const identifier =
            model == "commits" ? sourceId.slice(0, 7) : `#${sourceId}`;

        return (
            <ContextListItemContent>
                <ContextListItemHeader noWrap={true}>{name}</ContextListItemHeader>
                <ContextListItemSubHeader noWrap={true}>
                    {`${identifier} by ${creator} ${this.acquirePhrase()} ${this.renderFormattedDateString()}`}
                </ContextListItemSubHeader>
            </ContextListItemContent>
        );
    };

    render() {
        return (
            <>
                <ContextListItemContainer>
                    {this.renderIcon()}
                    {this.renderContent()}
                </ContextListItemContainer>
            </>
        );
    }
}

export default ContextListItem;

ContextListItem.propTypes = {
    item: PropTypes.object,
    model: PropTypes.string,
};

const ContextListItemContainer = styled.div`
    background-color: ${(props) => props.theme.SHADE_2};

    /*
    border: 1px solid ${(props) => props.theme.SHADE_8};
    */

    /*
    &:first-of-type {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px 0px;

        border: 1px solid ${(props) => props.theme.SHADE_4};

        background-color: ${(props) => props.theme.SHADE_4};

        margin-top: 0rem;
    }*/

    margin-top: 1rem;

    height: 5rem;

    border-radius: 0.6rem;

    width: 100%;

    display: flex;

    align-items: center;

    padding: 0.5rem 1rem;

    cursor: pointer;

    &:hover {
        box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

        border: 1px solid ${(props) => props.theme.SHADE_8};

        background-color: ${(props) => props.theme.SHADE_4};
    }

    transition: background-color 0.2s ease-in, box-shadow 0.2s ease-in;

    position: relative;
`;

const ContextListItemIconContainer = styled.div`
    min-height: 3.5rem;

    min-width: 3.5rem;

    background-color: ${(props) => props.theme.SHADE_8};

    border-radius: 0.7rem;

    display: flex;

    align-items: center;

    justify-content: center;
`;

const ContextListItemIcon = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    color: ${(props) => props.color};

    font-size: ${(props) => (props.size ? props.size : "1.9rem")};

    margin-top: ${(props) => (props.top ? props.top : "0rem")};
    /*
    margin-top: ${(props) => (props.top ? props.top : "0rem")};

    font-size: ${(props) => (props.size ? props.size : "2.1rem")};

    margin-left: ${(props) => (props.left ? props.left : "0.5rem")};

    color: ${(props) =>
        props.color}; /* #4284f4*/ /*#4284f4 - doc  #f27448 - card  #0D9D58 - spreadsheet*/

    /*opacity: 0.7;*/
`;

const ContextListItemContent = styled.div`
    height: 100%;

    width: 90%;

    display: flex;

    flex-direction: column;

    justify-content: center;

    padding: 0.12rem 1rem;

    padding-bottom: 0.05rem;
`;

const ContextListItemHeader = styled(SubHeader)`
    font-size: 1.1rem;
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
    font-weight: 400;

    opacity: 0.7;

    font-size: 1rem;
`;

const ContextListItemDate = styled.div`
    font-weight: 500;

    opacity: 0.6;

    font-size: 1.1rem;

    margin-left: auto;

    margin-top: 0.46rem;

    min-width: 8rem;
`;
