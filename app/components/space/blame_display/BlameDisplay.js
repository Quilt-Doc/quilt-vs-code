import React, { Component } from "react";

import chroma from "chroma-js";

import styled from "styled-components";

import vscode from "../../../vscode/vscode";

import DetailCard from "../detail_display/DetailCard";

import { VscGitPullRequest } from "react-icons/vsc";
import { BsCardChecklist, BsFileText } from "react-icons/bs";
import { ImFileText, ImFileText2 } from "react-icons/im";
import { RiFile2Line, RiFileList2Line, RiFileTextLine } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { BiGitCommit } from "react-icons/bi";
//"rgb(242,201,75)"

/*
    GET_DOCUMENT_TEXT
    RECEIVE_DOCUMENT_TEXT
    COMMUNICATE_BLAME
    FOCUS_BLAME_ANNOTATION
*/
class BlameDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedChunk: 36,
            blameChunks: [
                { start: 0, end: 20 },
                { start: 21, end: 35 },
                { start: 36, end: 51 },
                { start: 52, end: 108 },
                { start: 109, end: 140 },
            ],
        };

        this.annotations = {};
    }

    componentDidMount = () => {
        this.setupListeners();

        this.getDocumentText();
    };

    componentWillUnmount = () => {
        window.removeEventListener("message", this.handleTextMessage);

        window.removeEventListener("keydown", this.handleKeyDown);
    };

    setupListeners = () => {
        window.addEventListener("message", this.handleTextMessage);

        window.addEventListener("keydown", this.handleKeyDown);
    };

    handleTextMessage = ({ data: message }) => {
        console.log("Quilt Blame: Entering with message", message);

        const { type, payload } = message;

        switch (type) {
            case "RECEIVE_DOCUMENT_TEXT":
                this.retrieveContextBlame(payload);

                break;
            case "FOCUS_BLAME_ANNOTATION":
                this.focusChunk(payload);

                break;

            case "SELECT_BLAME_ANNOTATION":
                console.log(
                    "Quilt Blame: Entered with message SELECT_BLAME_ANNOTATION"
                );

                this.focusChunk(payload, false);

                break;
            default:
                return;
        }
    };

    handleKeyDown = (e) => {
        const { focusedChunk, blameChunks } = this.state;

        if (e.keyCode == "38") {
            e.preventDefault();

            // up
            let newIndex = blameChunks.length - 1;

            blameChunks.map((chunk, i) => {
                if (chunk.start == focusedChunk && i != 0) {
                    newIndex = i - 1;
                }
            });

            this.focusChunk(blameChunks[newIndex].start);
        } else if (e.keyCode == "40") {
            e.preventDefault();

            // down
            let newIndex = 0;

            blameChunks.map((chunk, i) => {
                if (
                    chunk.start == focusedChunk &&
                    i != blameChunks.length - 1
                ) {
                    newIndex = i + 1;
                }
            });

            this.focusChunk(blameChunks[newIndex].start);
        }
    };

    getDocumentText = () => {
        console.log("Quilt Blame: Sending message GET_DOCUMENT_TEXT");

        vscode.postMessage({
            type: "GET_DOCUMENT_TEXT",
        });
    };

    retrieveContextBlame = (text) => {
        console.log("Quilt Blame: Entered retrieveContextBlame with text:");

        console.log(
            "Quilt Blame: Sending message COMMUNICATE_BLAME",
            this.state.blameChunks
        );

        const { blameChunks, focusedChunk } = this.state;

        vscode.postMessage({
            type: "COMMUNICATE_BLAME",
            payload: {
                blameChunks,
                focusedChunk,
            },
        });
    };

    focusChunk = (start, shouldScroll = true) => {
        if (start == this.state.focusedChunk) return;

        this.setState({
            focusedChunk: start,
        });

        vscode.postMessage({
            type: "FOCUS_CHUNK",
            payload: {
                focusedChunk: start,
                shouldScroll,
            },
        });

        this.annotations[start].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
        });
    };

    renderChunkAnnotations = () => {
        const { blameChunks, focusedChunk } = this.state;

        return blameChunks.map((chunk) => {
            const { start, end } = chunk;

            return (
                <BlameContainer
                    isFocused={focusedChunk == start}
                    onClick={() => this.focusChunk(start)}
                    ref={(node) => (this.annotations[start] = node)}
                >
                    <AnnotationNavbar>
                        <Left>
                            <Header>CheckController.js</Header>
                            <LineNumber>{`Lines ${start + 1}-${
                                end + 1
                            }`}</LineNumber>
                        </Left>
                        <People>
                            <PersonIcon>FS</PersonIcon>
                        </People>
                    </AnnotationNavbar>
                    <AnnotationContent>
                        <DataTypeContainer>
                            <DataHeader bg={"rgb(93, 106, 210)"}>
                                Tickets
                            </DataHeader>
                            <DataList>
                                <DataItem>
                                    <DataIcon op={0.9} size={"1.8rem"}>
                                        <BsCardChecklist />
                                    </DataIcon>
                                    <DataText>Backend Query Checklist</DataText>
                                </DataItem>
                                <DataItem>
                                    <DataIcon op={0.9} size={"1.8rem"}>
                                        <BsCardChecklist />
                                    </DataIcon>
                                    <DataText>
                                        Cross-Platform Data Model Spec
                                    </DataText>
                                </DataItem>
                            </DataList>
                        </DataTypeContainer>
                        <DataTypeContainer>
                            <DataHeader bg={"rgb(77,183,130)"}>
                                Pull Requests
                            </DataHeader>
                            <DataList>
                                <DataItem>
                                    <DataIcon top={"-0.12rem"}>
                                        <VscGitPullRequest />
                                    </DataIcon>
                                    <DataText>
                                        Fixed a11y failing contrasts on greys
                                    </DataText>
                                    {/*focusedChunk == start && <DetailCard />*/}
                                </DataItem>
                                <DataItem>
                                    <DataIcon top={"-0.12rem"}>
                                        <VscGitPullRequest />
                                    </DataIcon>
                                    <DataText>
                                        Implemented Github Webhooks
                                    </DataText>
                                </DataItem>
                            </DataList>
                        </DataTypeContainer>
                        <DataTypeContainer>
                            <DataHeader bg={"rgb(242,201,75)"}>
                                Commits
                            </DataHeader>
                            <DataList>
                                <DataItem>
                                    <DataIcon top={"-0.05rem"}>
                                        <BiGitCommit />
                                    </DataIcon>
                                    <DataText>
                                        {
                                            "[QD-278] Validate Trello Lifecycle Tests Progress.."
                                        }
                                    </DataText>
                                </DataItem>
                                <DataItem>
                                    <DataIcon top={"-0.05rem"}>
                                        <BiGitCommit />
                                    </DataIcon>
                                    <DataText>
                                        {
                                            "Outdated reference check preventing repository.scanned…"
                                        }
                                    </DataText>
                                </DataItem>
                            </DataList>
                        </DataTypeContainer>
                        <DataTypeContainer>
                            <DataHeader bg={"#58a5ff"}>Documents</DataHeader>
                            <DataList>
                                <DataItem>
                                    <DataIcon
                                        top={"0.05rem"}
                                        op={0.9}
                                        size={"1.8rem"}
                                    >
                                        <RiFile2Line />
                                    </DataIcon>
                                    <DataText>Backend Query Checklist</DataText>
                                </DataItem>
                            </DataList>
                        </DataTypeContainer>
                    </AnnotationContent>
                </BlameContainer>
            );
        });
    };

    render() {
        return <Container>{this.renderChunkAnnotations()}</Container>;
    }
}
// bg: "rgb(242,201,75)", bo: "rgba(242,201,75,0.15)" },

// People related -> actual counts
//

export default BlameDisplay;

const Container = styled.div`
    height: calc(100vh - 4rem);

    display: flex;

    flex-direction: column;

    overflow-y: scroll;

    margin-top: 1.5rem;

    padding-bottom: 30rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Left = styled.div`
    display: flex;

    flex-direction: column;
`;

const LineNumber = styled.span`
    color: #58a5ff;

    font-weight: 500;

    font-size: 1.23rem;

    margin-top: 0.8rem;
`;

const Header = styled.div`
    font-size: 1.45rem;

    font-weight: 500;

    /*margin-bottom: 0.6rem;*/
`;

const People = styled.div`
    display: flex;

    margin-left: auto;
`;

const PersonIcon = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    height: 3.5rem;

    width: 3.5rem;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 0.4rem;

    letter-spacing: 1.5px;

    margin-right: 1.5rem;
    &:last-of-type {
        margin-right: 0rem;
    }

    margin-top: -0.7rem;
`;

const DataTypeContainer = styled.div`
    margin-top: 2rem;
`;

const AnnotationNavbar = styled.div`
    display: flex;

    align-items: center;
`;

const AnnotationContent = styled.div`
    display: flex;

    flex-direction: column;
`;

const DataHeader = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    opacity: 0.8;

    margin-bottom: ${(props) => props.marginBottom};

    overflow-wrap: break-word;

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
    /*
    margin-left: 0.5rem;

    margin-top: 1.3rem;

    height: 2.5rem
    
    */

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

    transition: background-color 0.08s ease-in;
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

const DataText = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    opacity: 0.8;

    margin-bottom: ${(props) => props.marginBottom};

    overflow-wrap: break-word;

    text-overflow: ellipsis;

    white-space: nowrap;

    overflow: hidden;
`;

const BlameContainer = styled.div`
    margin-top: 1.5rem;

    width: 100%;

    border-radius: 0.7rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    padding: 2rem;

    &:first-of-type {
        margin-top: 0rem;
    }

    &:last-of-type {
        margin-top: 1.6rem;
    }

    opacity: ${(props) => (props.isFocused ? "1" : "0.55")};

    &:hover {
        opacity: ${(props) => (props.isFocused ? "1" : "0.75")};
    }

    cursor: pointer;
`;
