import React, { Component } from "react";

import styled from "styled-components";

import chroma from "chroma-js";

//components
import { Header, SubHeader } from "../../../elements";

//icons
import { AiOutlineFileSearch } from "react-icons/ai";
import {
    VscFileCode,
    VscGithub,
    VscGithubInverted,
    VscGitPullRequest,
    VscIssues,
    VscOpenPreview,
} from "react-icons/vsc";
import { BsCardChecklist, BsFileDiff, BsFileText } from "react-icons/bs";
import { ImFileText, ImFileText2 } from "react-icons/im";
import {
    RiFile2Line,
    RiFileList2Line,
    RiFileTextLine,
    RiGithubFill,
    RiCalendarCheckFill,
    RiTrelloFill,
} from "react-icons/ri";
import { CgArrowLongRight } from "react-icons/cg";
import { FiGitBranch } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import {
    BiCheck,
    BiGitCommit,
    BiAlignLeft,
    BiMessageSquareDetail,
    BiCodeCurly,
    BiCalendarCheck,
} from "react-icons/bi";
import { TiTags } from "react-icons/ti";
import { MdFormatAlignLeft } from "react-icons/md";

//"rgb(242,201,75)"

//TODO: Need to set max lengths on everything

class DetailCard extends Component {
    handleOutsideClick = (e) => {
        if (this.menuRef && !this.menuRef.contains(e.target)) {
            e.stopPropagation();

            e.preventDefault();

            const { closeCard } = this.props;

            closeCard();
        }
    };

    renderFormattedDateString = () => {
        return "#137 opened by fsanal 7 days ago";

        const {
            elem: {
                sourceCreationDate,
                sourceId,
                creator: { userName },
                source,
            },
            kind,
        } = this.props;

        const currentDate = new Date();

        let dateString = "";

        const curr = {
            hour: currentDate.getHours(),
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
        };

        const src = {
            hour: sourceCreationDate.getHours(),
            day: sourceCreationDate.getDate(),
            month: sourceCreationDate.getMonth(),
            year: sourceCreationDate.getFullYear(),
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

        switch (kind) {
            case "ticket":
                if (source == "jira") {
                    return `${sourceId} created by ${userName} ${dateString}`;
                } else {
                    return `#${sourceId} created by ${userName} ${dateString}`;
                }

            case "commit":
                return `Committed by ${userName} ${dateString}`;

            case "pullRequest":
                return `#${sourceId} opened by ${userName} ${dateString}`;

            case "document":
                return `Created by ${userName} ${dateString}`;

            default:
                return "";
        }
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
        } else if (kind == "commit") {
            const { sourceId } = commit;

            content = <ElementSpec>{sourceId.slice(0, 7)}</ElementSpec>;
        }

        if (content) {
            return <NavSpec>{content}</NavSpec>;
        } else {
            return <Spacing />;
        }
    };

    renderNavSection = () => {
        const { kind, elem } = this.props;

        const metadata = {
            pullRequest: {
                primaryIcon: {
                    icon: <VscGitPullRequest />,
                    color: "rgb(77, 183, 130)",
                    size: "1.8rem",
                    top: "-0.12rem",
                },
                checkIcon: {
                    color: "rgb(77, 183, 130)",
                    icon: <BiCheck />,
                },
            },
            ticket: {
                primaryIcon: {
                    icon: <BsCardChecklist />,
                    color: "rgb(93, 106, 210)",
                    size: "1.9rem",
                    top: "-0.04rem",
                },
                checkIcon: {
                    color: "rgb(77, 183, 130)",
                    icon: <RiCalendarCheckFill />,
                    top: "-0.13rem",
                },
            },
            commit: {},
        };

        const { primaryIcon, checkIcon } = metadata[kind];

        const { name } = elem;

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
                    <DetailCardIcon
                        color={checkIcon["color"]}
                        top={primaryIcon["top"]}
                    >
                        {checkIcon["icon"]}
                    </DetailCardIcon>
                    <SubHeader noWrap={true}>
                        {this.renderFormattedDateString()}
                    </SubHeader>
                </DetailCardSubHeaderContainer>
                {this.renderNavSpec()}
            </>
        );
    };

    renderFullName = (name) => {
        let split = name.split("/");

        if (split.length == 2) {
            return `${split[0]} / ${split[1]}`;
        } else {
            const username = split.shift();

            return `${username} / ${split.join("/")}`;
        }
    };

    renderStatus = () => {
        const { elem, kind } = this.props;

        let icon;

        let status;

        let sourceObjName;

        let statusColor;

        switch (kind) {
            case "pullRequest":
                sourceObjName = this.renderFullName(elem.repository.fullName);

                icon = (
                    <VscGithubInverted
                        style={{
                            marginRight: "0.6rem",
                            fontSize: "1.7rem",
                        }}
                    />
                );

                status = "Under Review";

                break;
            case "commit":
                sourceObjName = this.renderFullName(elem.repository.fullName);

                icon = (
                    <VscGithubInverted
                        style={{
                            marginRight: "0.6rem",
                            fontSize: "1.7rem",
                        }}
                    />
                );

                break;
            case "document":
                sourceObjName = elem.drive.name;

                break;
            case "ticket":
                sourceObjName = elem.board.name;

                status = elem.column.name;

                statusColor = "#58a5ff";

                if (elem.source == "trello") {
                    icon = (
                        <RiTrelloFill
                            style={{
                                marginRight: "0.7rem",
                                fontSize: "1.9rem",
                            }}
                        />
                    );
                } else if (elem.source == "jira") {
                    icon = (
                        <RiTrelloFill
                            style={{
                                marginRight: "0.7rem",
                                fontSize: "1.9rem",
                            }}
                        />
                    );
                }

                break;
            default:
                return;
        }

        return (
            <DetailCardItem>
                <DetailCardIcon op={0.8} size={"1.9rem"}>
                    <VscOpenPreview />
                </DetailCardIcon>
                <DetailSourceObj>
                    {icon}
                    <OpaqueSubHeader noWrap={true}>
                        {sourceObjName}
                    </OpaqueSubHeader>
                </DetailSourceObj>
                {status && (
                    <DetailContent>
                        <DetailStatus color={statusColor}>
                            <OpaqueSubHeader noWrap={true}>
                                {status}
                            </OpaqueSubHeader>
                        </DetailStatus>
                    </DetailContent>
                )}
            </DetailCardItem>
        );
    };

    renderTags = () => {
        const { elem, kind } = this.props;

        if (kind == "ticket" || kind == "pullRequest") {
            const { labels } = elem;

            return (
                <DetailCardItem>
                    <DetailCardIcon op={0.8} size={"2rem"}>
                        <TiTags />
                    </DetailCardIcon>
                    <DetailContent>
                        <DetailTags>
                            {labels.map((label) => {
                                const { name, color } = label;

                                return (
                                    <Tag>
                                        <OpaqueSubHeader>
                                            {name}
                                        </OpaqueSubHeader>
                                    </Tag>
                                );
                            })}
                        </DetailTags>
                    </DetailContent>
                </DetailCardItem>
            );
        }
    };

    renderDescription = () => {
        const { elem, kind } = this.props;

        const descriptionKinds = new Set(["pullRequest", "commit", "ticket"]);

        if (descriptionKinds.has(kind)) {
            let description;

            if (kind == "commit") {
                const { name } = commit;

                description = name.split("\n").slice(1).join("\n");
            } else {
                description = elem.description;
            }

            return (
                <DetailCardDesc>
                    <DetailContent>
                        <DetailDesc>
                            <OpaqueSubHeader>{description}</OpaqueSubHeader>
                        </DetailDesc>
                    </DetailContent>
                </DetailCardDesc>
            );
        }
    };

    renderCounts = () => {
        return (
            <DetailCountsContainer>
                <DetailCounts>
                    <Count color={"#f69700"}>
                        <CountIcon>
                            <BiGitCommit />
                        </CountIcon>
                        <OpaqueSubHeader marginLeft={"0.6rem"}>
                            3
                        </OpaqueSubHeader>
                    </Count>
                    <Count color={"rgb(93, 106, 210)"}>
                        <CountIcon top={"-0.1rem"}>
                            <VscIssues />
                        </CountIcon>
                        <OpaqueSubHeader marginLeft={"0.6rem"}>
                            3
                        </OpaqueSubHeader>
                    </Count>
                    <Count color={"#58a5ff"}>
                        <CountIcon top={"0.03rem"} size={"1.3rem"}>
                            <BiCodeCurly />
                        </CountIcon>
                        <OpaqueSubHeader marginLeft={"0.6rem"}>
                            3
                        </OpaqueSubHeader>
                    </Count>
                    <Count color={"rgb(77, 183, 130)"}>
                        <CountIcon top={"0rem"} size={"1.3rem"}>
                            <BiMessageSquareDetail />
                        </CountIcon>
                        <OpaqueSubHeader marginLeft={"0.6rem"}>
                            5
                        </OpaqueSubHeader>
                    </Count>
                </DetailCounts>
            </DetailCountsContainer>
        );
    };

    render() {
        const { isOpen } = this.props;

        return (
            <>
                {isOpen && (
                    <>
                        <MenuBackground onMouseDown={this.handleOutsideClick} />
                        <DetailCardContainer
                            ref={(node) => (this.menuRef = node)}
                        >
                            {this.renderNavSection()}
                            <Divider />
                            {this.renderStatus()}
                            {this.renderTags()}
                            {this.renderDescription()}
                            {this.renderCounts()}
                        </DetailCardContainer>
                    </>
                )}
            </>
        );

        /*
        return (
            <DetailCardContainer>
                {this.renderNavSection()}
                <Divider />
                {this.renderStatus()}
                {this.renderTags()}
                {this.renderDescription()}
                {this.renderCounts()}
            </DetailCardContainer>
        );*/
    }
}

// under review between tags and description
/* #F85149
- **Directly Linked Issues?**
- **Review Status**
- **Labels**
- **Number of Commits**
- **Number of Comments**
- **Number of Files**
- Number of Associated Elements
- **Branches Involved**
*/

// hover to see expand and link to
// branches
// description
// github repository

//colored icons

export default DetailCard;

const MenuBackground = styled.div`
    position: fixed;

    z-index: 1;

    left: 0;

    top: 0;

    width: 100vw;

    height: 100vh;

    overflow: hidden;

    background-color: transparent;
`;

const CountIcon = styled.div`
    font-size: ${(props) => (props.size ? props.size : "1.5rem")};

    margin-top: ${(props) => props.top};

    height: 100%;

    display: flex;

    align-items: center;
`;

//TODO: Give Max Length
const DetailSourceObj = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    color: white;

    align-items: center;

    padding: 0rem 1.5rem;

    display: inline-flex;

    margin-right: 1rem;
`;

const OpaqueSubHeader = styled(SubHeader)`
    opacity: 1;

    margin-left: ${(props) => props.marginLeft};
`;

const DetailStatus = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${(props) =>
        props.color
            ? chroma(props.color).alpha(0.2)
            : chroma("#FC427B").alpha(0.2)};

    color: ${(props) => (props.color ? props.color : "#fc427b")};

    align-items: center;

    padding: 0rem 1.5rem;

    display: inline-flex;
`;

const DetailCountsContainer = styled.div`
    display: flex;

    align-items: center;
`;

const DetailCounts = styled.div`
    display: flex;

    margin-left: auto;
`;

const Count = styled.div`
    height: 2.5rem;

    width: 5rem;

    display: flex;

    border-radius: 0.4rem;

    justify-content: center;

    align-items: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    margin-left: 1rem;

    color: ${(props) => props.color};
`;

const DetailCardDesc = styled.div`
    margin-bottom: 1.5rem;

    display: flex;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.6rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};
`;

const DetailDesc = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    padding: 1.5rem;

    border-radius: 0.6rem;
`;

const DetailTags = styled.div`
    display: flex;

    flex-wrap: wrap;
`;

const Tag = styled.div`
    border: 1px solid rgb(93, 106, 210, 0.8);

    padding: 0.2rem 0.8rem;

    margin-right: 1rem;

    border-radius: 0.7rem;
`;

const DetailCardItem = styled.div`
    margin-bottom: 1.5rem;

    display: flex;

    align-items: center;
`;

const DetailContent = styled.div``;

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
`;

const Spacing = styled.div`
    height: 0.2rem;
`;

const NavSpec = styled.div`
    height: 3.5rem;

    background-color: ${(props) =>
        props.bg ? chroma(props.bg).alpha(0.15) : ""};

    margin-left: -0.1rem;

    margin-top: 0.35rem;

    border-radius: 0.5rem;

    display: flex;

    align-items: center;

    margin-left: -1rem;

    padding-left: 1rem;
`;

const Divider = styled.div`
    margin-top: 1.3rem;

    margin-bottom: 1.3rem;

    margin-left: 2.8rem;

    border-bottom: 2px solid
        ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;

const DetailCardSubHeaderContainer = styled.div`
    display: flex;

    align-items: center;

    margin-top: 0.65rem;
`;

//TODO: REMOVE MIN-HEIGHT
const DetailCardContainer = styled.div`
    min-height: 30rem;

    position: absolute;

    width: 40rem;

    max-width: calc(100vw-5rem);

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px 0px;

    border: 1px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    top: 3.5rem;

    z-index: 1;

    border-radius: 1rem;

    display: flex;

    flex-direction: column;

    padding: 2rem 2.2rem;

    padding-bottom: 1.5rem;
`;

const DetailCardHeaderContainer = styled.div`
    display: flex;

    align-items: center;

    /*margin-bottom: 0.6rem;*/
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

/*        const blameColors = [
            "rgb(93,106,210)",
            "rgb(77,183,130)",
            "rgb(195,119,224)",
            "rgb(197,41,40)",
            "rgb(37,181,206)",
            "rgb(235,87,87)",
            "rgb(242,201,75)",
            "rgb(255,120,203)",
            "rgb(235,90,71)",
        ];
        */

/*
<DetailCardContainer>
<DetailCardHeader>
    <DetailCardIcon
        color={"rgb(77, 183, 130)"}
        size={"1.8rem"}
        top={"-0.12rem"}
    >
        <VscGitPullRequest />
    </DetailCardIcon>
    <DetailCardText>
        Fixed a11y failing contrasts on greys
    </DetailCardText>
</DetailCardHeader>
<DetailCardSubHeader>
    <DetailCardIcon color={"rgb(77, 183, 130)"}>
        <BiCheck />
    </DetailCardIcon>
    #463 opened by kgodara 7 days ago
</DetailCardSubHeader>
<DetailCompletion>
    <DetailCardIcon></DetailCardIcon>
    <Branch>trello-integration</Branch>
    <Arrow>
        <CgArrowLongRight />
    </Arrow>
    <Branch>master</Branch>
</DetailCompletion>
<Divider />
<DetailCardItem>
    <DetailCardIcon op={0.8} size={"1.9rem"}>
        <VscOpenPreview />
    </DetailCardIcon>

    <DetailRepo>
        <VscGithubInverted
            style={{
                marginRight: "0.6rem",
                fontSize: "1.7rem",
            }}
        />
        {"Quilt / doc-app"}
    </DetailRepo>
    <DetailContent>
        <DetailStatus>Under Review</DetailStatus>
    </DetailContent>
</DetailCardItem>
<DetailCardItem>
    <DetailCardIcon op={0.8} size={"2rem"}>
        <TiTags />
    </DetailCardIcon>
    <DetailContent>
        <DetailTags>
            <Tag>v4</Tag>
            <Tag>trello</Tag>
        </DetailTags>
    </DetailContent>
</DetailCardItem>

<DetailCardDesc>
    <DetailContent>
        <DetailDesc>
            {
                "This feature enables support for prepending a base URL to relative paths in links and images when converting Markdown to HTML. Closes #536"
            }
        </DetailDesc>
    </DetailContent>
</DetailCardDesc>
<DetailCountsContainer>
    <DetailCounts>
        <Count color={"#f69700"}>
            <CountIcon top={"0.3rem"}>
                <BiGitCommit />
            </CountIcon>
            <CountText>3</CountText>
        </Count>
        <Count color={"rgb(93, 106, 210)"}>
            <CountIcon top={"0.11rem"}>
                <VscIssues />
            </CountIcon>
            <CountText>3</CountText>
        </Count>
        <Count color={"#58a5ff"}>
            <CountIcon size={"1.3rem"} top={"0.1645rem"}>
                <BiCodeCurly />
            </CountIcon>
            <CountText>3</CountText>
        </Count>
        <Count color={"rgb(77, 183, 130)"}>
            <CountIcon top={"0.165rem"} size={"1.3rem"}>
                <BiMessageSquareDetail />
            </CountIcon>
            <CountText>5</CountText>
        </Count>
    </DetailCounts>
</DetailCountsContainer>
</DetailCardContainer>*/
