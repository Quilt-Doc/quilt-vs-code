import React, { Component } from "react";

import styled from "styled-components";

import vscode from "../../../vscode/vscode";

//components
import AnnotationCard from "./AnnotationCard";

//redux
import { connect } from "react-redux";

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
        const { type, payload } = message;

        switch (type) {
            case "RECEIVE_DOCUMENT_TEXT":
                this.retrieveContextBlame(payload);

                break;
            case "FOCUS_BLAME_ANNOTATION":
                this.focusChunk(payload);

                break;

            case "SELECT_BLAME_ANNOTATION":
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
        vscode.postMessage({
            type: "GET_DOCUMENT_TEXT",
        });
    };

    retrieveContextBlame = (text) => {
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

        const exampleData = {
            keyUser: "FS",
            tickets: [
                {
                    name: "Backend Query Checklist",
                },
                {
                    name: "Cross-Platform Data Model Spec",
                },
            ],
            pullRequests: [
                {
                    name: "Fixed Modularization of Blame Display",
                },
                {
                    name: "Implemented Github Webhooks",
                },
            ],
            commits: [
                {
                    name: "[QD-278] Validate Trello Lifecycle Tests Progress..",
                },
                {
                    name:
                        "Outdated reference check preventing repository.scanned…",
                },
            ],
            documents: [
                {
                    name: "Backend Query Checklist",
                },
            ],
        };

        return blameChunks.map((chunk, i) => {
            chunk = { ...chunk, ...exampleData };

            chunk._id = i;

            const { start } = chunk;

            const isFocused = focusedChunk == start;

            const filename = "BlameDisplay.js";

            return (
                <AnnotationCardContainer
                    key={chunk._id}
                    isFocused={isFocused}
                    onClick={() => this.focusChunk(start)}
                    ref={(node) => (this.annotations[start] = node)}
                >
                    <AnnotationCard filename={filename} chunk={chunk} />
                </AnnotationCardContainer>
            );
        });
    };

    render() {
        return <Container>{this.renderChunkAnnotations()}</Container>;
    }
}

const mapStateToProps = (state) => {
    const {
        global: { activeFilePath },
    } = state;

    let values = {};

    if (activeFilePath) {
        values["filename"] = activeFilePath.split("/").pop();
    }

    return values;
};

export default connect(mapStateToProps, {})(BlameDisplay);

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

const AnnotationCardContainer = styled.div`
    margin-top: 1.5rem;

    width: 100%;

    border-radius: 0.7rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    padding: 2rem;

    &:first-of-type {
        margin-top: 0rem;
    }

    opacity: ${(props) => (props.isFocused ? "1" : "0.55")};

    &:hover {
        opacity: ${(props) => (props.isFocused ? "1" : "0.75")};
    }

    cursor: pointer;
`;
