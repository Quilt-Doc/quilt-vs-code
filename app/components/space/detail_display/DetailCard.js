import React, { Component } from "react";

import styled from "styled-components";

import chroma from "chroma-js";

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
} from "react-icons/bi";
import { TiTags } from "react-icons/ti";
import { MdFormatAlignLeft } from "react-icons/md";
//"rgb(242,201,75)"

class DetailCard extends Component {
    render() {
        const blameColors = [
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
        return (
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
                    {/*<DetailCardIcon op={0.8} size={"2rem"}>
                        <MdFormatAlignLeft />
                    </DetailCardIcon>*/}
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
            </DetailCardContainer>
        );
    }
}

/*
<DetailCardItem>
<DetailCardIcon op={0.8} size={"1.9rem"}>
    <VscOpenPreview />
</DetailCardIcon>
<DetailContent>
    <DetailStatus>Under Review</DetailStatus>
</DetailContent>
</DetailCardItem>
*/
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

const CountIcon = styled.div`
    font-size: ${(props) => (props.size ? props.size : "1.5rem")};

    margin-top: ${(props) => props.top};
`;

const DetailRepo = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    color: white;

    align-items: center;

    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    padding: 0rem 1.5rem;

    display: inline-flex;

    margin-right: 1rem;
`;

const CountText = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    margin-left: 0.6rem;
`;

const DetailStatus = styled.div`
    height: 3rem;

    border-radius: 0.5rem;

    background-color: ${chroma("#FC427B").alpha(0.2)};

    color: #fc427b;

    align-items: center;

    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

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

const SubDetailCount = styled.div`
    margin-left: 0.35rem;

    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;
`;

const SubDetail = styled.div`
    height: 3.5rem;

    width: 3.5rem;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 0.4rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    margin-left: 1rem;
`;

const DetailReviewStatus = styled.div`
    height: 3.5rem;

    width: 3.5rem;

    border-radius: 0.4rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${chroma("#ff6774").alpha(0.2)};

    color: #b33771;

    font-size: 1.5rem;
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

    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;
`;

const DetailTags = styled.div`
    display: flex;

    flex-wrap: wrap;
`;

const Tag = styled.div`
    border: 1px solid rgb(93, 106, 210, 0.8);

    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

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

const Branch = styled.div`
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

const DetailCardInfo = styled.div`
    display: flex;

    margin-top: auto;
`;

const DetailCardIntegrationName = styled.div`
    margin-left: auto;

    opacity: 0.9;

    display: flex;

    align-items: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    padding: 0.4rem 1rem;

    border-radius: 0.6rem;
`;

const DetailCardIntegrationIcon = styled.div`
    font-size: 1.7rem;

    margin-top: 0.2rem;

    margin-right: 0.5rem;
`;

const DetailCardIntegrationText = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    color: ${(props) => props.color};
`;

const DetailCompletion = styled.div`
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

const SubHeader = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    color: ${(props) => props.color};
`;

const DetailCardSubHeader = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    display: flex;

    align-items: center;

    margin-top: 0.65rem;

    opacity: 0.8;
`;

const DetailCardContainer = styled.div`
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

const DetailCardHeader = styled.div`
    font-size: 1.45rem;

    font-weight: 500;

    margin-bottom: ${(props) => props.marginBottom};

    overflow-wrap: break-word;

    text-overflow: ellipsis;

    white-space: nowrap;

    overflow: hidden;

    display: flex;

    align-items: center;

    /*margin-bottom: 0.6rem;*/
`;

const DetailCardText = styled.div``;

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
