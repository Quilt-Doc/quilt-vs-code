import React, { Component } from "react";

import styled from "styled-components";
import chroma from "chroma-js";

//components
import { Header, UserIcon, SubHeader } from "../../../elements";
import DetailCard from "../detail_display/DetailCard";

//icons
import { VscGitPullRequest } from "react-icons/vsc";
import { BsCardChecklist } from "react-icons/bs";
import { RiFile2Line } from "react-icons/ri";
import { BiGitCommit } from "react-icons/bi";

class AnnotationCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedDataItem: null,
        };
    }

    renderData = () => {
        const { chunk, isFocused } = this.props;

        const metadatas = [
            {
                kind: "tickets",
                header: "Tickets",
                bg: "rgb(93, 106, 210)",
                icon: (
                    <DataIcon op={0.9} size={"1.8rem"}>
                        <BsCardChecklist />
                    </DataIcon>
                ),
            },
            {
                kind: "pullRequests",
                header: "Pull Requests",
                bg: "rgb(77,183,130)",
                icon: (
                    <DataIcon top={"-0.12rem"}>
                        <VscGitPullRequest />
                    </DataIcon>
                ),
            },
            {
                kind: "commits",
                header: "Commits",
                bg: "rgb(242,201,75)",
                icon: (
                    <DataIcon top={"-0.05rem"}>
                        <BiGitCommit />
                    </DataIcon>
                ),
            },
            {
                kind: "documents",
                header: "Documents",
                bg: "#58a5ff",
                icon: (
                    <DataIcon top={"0.05rem"} op={0.9} size={"1.8rem"}>
                        <RiFile2Line />
                    </DataIcon>
                ),
            },
        ];

        return metadatas.map((metadata) => {
            const { kind, header, bg, icon } = metadata;

            const items = chunk[kind];

            if (!items) return;

            return (
                <DataTypeContainer key={`${chunk._id}-${header}`}>
                    <DataHeader bg={bg}>{header}</DataHeader>
                    <DataList>
                        {this.renderDataItems(chunk, items, kind, icon)}
                    </DataList>
                </DataTypeContainer>
            );
        });
    };

    renderDataItems = (chunk, items, kind, icon) => {
        const { openedDataItem } = this.state;

        /*
        const exampleElem = {
            name: "Cross-Platform Data Model Spec",
            source: "trello",
            column: {
                name: "In Progress",
            },
            board: {
                name: "Quilt Product",
            },
            labels: [{ name: "auth" }, { name: "blame" }],
            description:
                "It causes problems with some of our Azure extension commands because we don't expect that object. I know registerCommand doesn't make any guarantees about the type of arguments passed in to the command, but I couldn't find any VS Code API matching that object and I'm guessing you didn't mean to pass that along. We could adjust all of our commands to handle that object, or y'all could just pass undefined and fix it for us. 😊",
        };*/

        const exampleElem = {
            name: "Fixed Modularization of Blame Display",
            source: "github",
            baseRef: "github-integration",
            headRef: "master",
            repository: {
                fullName: "Quilt/quilt-vs-code",
            },
            labels: [{ name: "v4" }, { name: "context display" }],
            description:
                "Creates the blame purely based on the code object, by merging the CO blame with that of the user's currently open file. Additionally, categorizes code objects together based on similar blames, identifying relevant, compact blame areas.",
        };

        return items.map((item) => {
            const { name } = item;

            return (
                <DataItem
                    key={`${chunk._id}-${name}`}
                    onClick={() =>
                        this.setState({
                            openedDataItem: `${chunk._id}-${name}`,
                        })
                    }
                >
                    {icon}
                    <SubHeader noWrap={true}>{name}</SubHeader>
                    <DetailCard
                        elem={exampleElem}
                        kind={kind.slice(0, kind.length - 1)}
                        isOpen={openedDataItem == `${chunk._id}-${name}`}
                        closeCard={() =>
                            this.setState({
                                openedDataItem: null,
                            })
                        }
                    />
                </DataItem>
            );
        });
    };

    renderNavbar = () => {
        const {
            filename,
            chunk: { start, end, keyUser },
        } = this.props;

        return (
            <AnnotationNavbar>
                <HeaderContainer>
                    <Header marginBottom={"0rem"}>{filename}</Header>
                    <LineNumber>{`Lines ${start + 1}-${end + 1}`}</LineNumber>
                </HeaderContainer>
                <UserContainer>
                    <UserIcon>{keyUser}</UserIcon>
                </UserContainer>
            </AnnotationNavbar>
        );
    };

    render() {
        return (
            <>
                {this.renderNavbar()}
                <AnnotationContent>{this.renderData()}</AnnotationContent>
            </>
        );
    }
}

export default AnnotationCard;

const HeaderContainer = styled.div`
    display: flex;

    flex-direction: column;
`;

const StyledHeader = styled(Header)`
    margin-bottom: 0rem;
`;

const LineNumber = styled.span`
    color: #58a5ff;

    font-weight: 500;

    font-size: 1.23rem;

    margin-top: 0.8rem;
`;

const UserContainer = styled.div`
    display: flex;

    margin-left: auto;
`;

const AnnotationNavbar = styled.div`
    display: flex;

    align-items: center;
`;

const AnnotationContent = styled.div`
    display: flex;

    flex-direction: column;
`;

const DataTypeContainer = styled.div`
    margin-top: 2rem;
`;

const DataHeader = styled(SubHeader)`
    background-color: ${(props) => chroma(props.bg).alpha(0.2)};

    color: ${(props) => props.bg};

    padding: 0.4rem 1rem;

    border-radius: 0.4rem;

    display: inline-flex;

    margin-bottom: 0.8rem;
`;

const DataList = styled.div`
    display: flex;

    flex-direction: column;
`;

const DataItem = styled.div`
    display: flex;

    align-items: center;

    position: relative;

    padding-left: 0.7rem;

    margin-left: -0.3rem;

    border-radius: 0.4rem;

    margin-top: 0.3rem;

    height: 3.2rem;

    cursor: pointer;

    &:hover {
        background-color: ${(props) =>
            props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
    }

    transition: background-color 0.07s ease-in;

    /*
    margin-left: 0.5rem;

    margin-top: 1.3rem;

    height: 2.5rem
    
    */
`;

const DataIcon = styled.div`
    font-size: ${(props) => (props.size ? props.size : "1.7rem")};

    margin-top: ${(props) => props.top};

    min-width: 2.7rem;

    max-width: 2.7rem;

    opacity: 0.95;

    opacity: ${(props) => props.op};

    display: flex;
`;
