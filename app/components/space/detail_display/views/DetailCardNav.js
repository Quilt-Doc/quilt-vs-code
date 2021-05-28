import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//components
import { Header, SubHeader } from "../../../../elements";

//icons
import { VscGitPullRequest, VscGitMerge } from "react-icons/vsc";
import { BsCardChecklist } from "react-icons/bs";
import { CgArrowLongRight } from "react-icons/cg";
import { BiGitCommit } from "react-icons/bi";

class DetailCardNav extends Component {
    renderFormattedDateString = () => {
        const {
            elem: { sourceCreationDate, mergedAt, sourceCloseDate },
            kind: model,
        } = this.props;

        let relevantDate = sourceCreationDate;

        if (model == "pullRequest" || model == "ticket") {
            if (model.state == "CLOSED") {
                relevantDate = sourceCloseDate;
            } else if (model.state == "MERGED") {
                relevantDate = mergedAt;
            }
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

    renderNavSpec = () => {
        const { kind, elem } = this.props;

        const { source } = elem;

        let content;

        if (kind == "pullRequest") {
            const { baseRef, headRef } = elem;

            content = (
                <>
                    <ElementSpec>{baseRef}</ElementSpec>
                    <Arrow>
                        <CgArrowLongRight />
                    </Arrow>
                    <ElementSpec>{headRef}</ElementSpec>
                </>
            );
        } else if (kind == "ticket" && source == "jira") {
            const { jiraEpic } = elem;

            content = <ElementSpec>{jiraEpic}</ElementSpec>;
        }

        if (content) {
            return <NavSpec>{content}</NavSpec>;
        } else {
            return <Spacing />;
        }
    };

    acquirePhrase = () => {
        const {
            elem: { sourceId, creator, source, state },
            kind,
        } = this.props;

        const dateString = this.renderFormattedDateString();

        const action =
            state == "OPEN"
                ? "opened on"
                : state == "CLOSED"
                ? "closed on"
                : "merged on";

        switch (kind) {
            case "ticket":
                if (source == "jira") {
                    return `${sourceId} by ${creator} created on ${dateString}`;
                } else {
                    return `#${sourceId} by ${creator} created on ${dateString}`;
                }

            case "commit":
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ElementSpec marginRight={"0.65rem"}>
                            {sourceId.slice(0, 7)}
                        </ElementSpec>
                        {` committed by ${creator} on ${dateString}`}
                    </div>
                );

            case "pullRequest":
                return `#${sourceId} by ${creator} ${action} ${dateString}`;

            case "document":
                return `Created by ${creator} on ${dateString}`;

            default:
                return "";
        }
    };

    renderContent = () => {
        const { kind, elem } = this.props;

        const { state, name } = elem;

        const metadata = {
            pullRequest: {
                primaryIcon: {
                    icon:
                        state == "MERGED" ? <VscGitMerge /> : <VscGitPullRequest />,
                    color:
                        state == "MERGED"
                            ? "#a470f7"
                            : state == "CLOSED"
                            ? "#f85149"
                            : "rgb(77,183,130)",
                    size: "1.8rem",
                    top: "-0.12rem",
                },
            },
            ticket: {
                primaryIcon: {
                    icon: <BsCardChecklist />,
                    color: "rgb(93, 106, 210)",
                    size: "1.9rem",
                    top: "-0.04rem",
                },
            },
            commit: {
                primaryIcon: {
                    icon: <BiGitCommit />,
                    color: "#f69700",
                    size: "1.9rem",
                    top: "0.1rem",
                },
            },
        };

        const { primaryIcon } = metadata[kind];

        return (
            <>
                <DetailCardHeaderContainer>
                    <DetailCardIcon
                        color={primaryIcon["color"]}
                        size={primaryIcon["size"]}
                        top={primaryIcon["top"]}
                    >
                        {primaryIcon["icon"]}
                    </DetailCardIcon>
                    <Header noWrap={true} marginBottom={"0rem"}>
                        {name}
                    </Header>
                </DetailCardHeaderContainer>
                <DetailCardSubHeaderContainer>
                    <SubHeader noWrap={true}>{this.acquirePhrase()}</SubHeader>
                </DetailCardSubHeaderContainer>
                {this.renderNavSpec()}
            </>
        );
    };

    render() {
        return this.renderContent();
    }
}

export default DetailCardNav;

DetailCardNav.propTypes = {
    kind: PropTypes.string,
    elem: PropTypes.object,
};

const Arrow = styled.div`
    width: 3rem;

    opacity: 0.7;

    font-size: 1.3rem;

    margin-top: 0.1rem;

    display: flex;

    align-items: center;

    justify-content: center;
`;

const ElementSpec = styled.div`
    color: #58a5ff;

    background-color: ${chroma("#58a5ff").alpha(0.2)};

    font-family: "Roboto Mono", monospace;

    font-size: 1.1rem;

    font-weight: 400;

    line-height: 1.8;

    padding: 0rem 0.5rem;

    border-radius: 0.45rem;

    color: ${(props) => props.color};

    margin-right: ${(props) => props.marginRight};
`;

const Spacing = styled.div`
    height: 0.2rem;
`;

const NavSpec = styled.div`
    height: 3.5rem;

    background-color: ${(props) => (props.bg ? chroma(props.bg).alpha(0.15) : "")};

    margin-left: -0.1rem;

    margin-top: 0.35rem;

    border-radius: 0.5rem;

    display: flex;

    align-items: center;

    margin-left: -1rem;

    padding-left: 1rem;
`;

const DetailCardSubHeaderContainer = styled.div`
    display: flex;

    align-items: center;

    margin-top: 0.65rem;
`;

const DetailCardHeaderContainer = styled.div`
    display: flex;

    align-items: center;
`;

const DetailCardIcon = styled.div`
    font-size: ${(props) => (props.size ? props.size : "1.7rem")};

    margin-top: ${(props) => props.top};

    min-width: 2.8rem;

    max-width: 2.8rem;

    opacity: 0.95;

    opacity: ${(props) => props.op};

    display: flex;

    color: ${(props) => (props.color ? props.color : "")};
`;
