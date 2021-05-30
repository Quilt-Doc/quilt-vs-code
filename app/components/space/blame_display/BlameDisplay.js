import React, { Component } from "react";

import styled from "styled-components";

import vscode from "../../../vscode/vscode";

//components
import AnnotationCard from "./AnnotationCard";
import GitAlert from "../alerts/GitAlert";
import { Loader } from "../../../elements";

//redux
import { connect } from "react-redux";

//actions
import { retrieveBlames } from "../../../actions/BlameActions";

//router
import { withRouter } from "react-router-dom";

//utils
import _ from "lodash";

class BlameDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedChunk: 0,
            cannotFind: false,
            isLoaded: false,
        };

        this.annotations = {};
    }

    componentDidUpdate = (prevProps) => {
        const { activeFilePath, repositoryFullName } = this.props;

        if (
            prevProps.activeFilePath != activeFilePath ||
            prevProps.repositoryFullName != repositoryFullName
        ) {
            console.log({
                prevActiveFilePath: prevProps.activeFilePath,
                activeFilePath,
                prevRepositoryFullName: prevProps.repositoryFullName,
                repositoryFullName,
            });

            this.getDocumentText();
        }
    };

    componentDidMount = () => {
        this.setupListeners();

        this.getDocumentText();
    };

    componentWillUnmount = () => {
        vscode.postMessage({
            type: "REMOVE_BLAME",
        });

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
        const { blameChunks } = this.props;

        const { focusedChunk } = this.state;

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
                if (chunk.start == focusedChunk && i != blameChunks.length - 1) {
                    newIndex = i + 1;
                }
            });

            this.focusChunk(blameChunks[newIndex].start);
        }
    };

    getDocumentText = () => {
        const { activeFilePath, repositoryFullName } = this.props;

        if (_.isNil(activeFilePath) || _.isNil(repositoryFullName)) {
            this.setState({ cannotFind: true, isLoaded: true });
        } else {
            this.setState({ cannotFind: false, isLoaded: false }, () => {
                console.log("Current State", this.state);
            });

            vscode.postMessage({
                type: "GET_DOCUMENT_TEXT",
            });
        }
    };

    retrieveContextBlame = async (text) => {
        if (this.state.isLoaded) this.setState({ isLoaded: false });

        const {
            retrieveBlames,
            repositoryFullName,
            match,
            workspaces,
            activeFilePath,
        } = this.props;

        const { workspaceId } = match.params;

        const workspace = workspaces[workspaceId];

        const filteredRepositories = workspace.repositories.filter((repo) => {
            const { fullName } = repo;

            return fullName == repositoryFullName;
        });

        /*  console.log("Parameters", {
            repositoryFullName,
            activeFilePath,
            filteredRepositories,
        }); */

        if (
            !repositoryFullName ||
            !activeFilePath ||
            filteredRepositories.length == 0
        ) {
            this.setState({
                cannotFind: true,
                isLoaded: true,
            });

            return;
        } else {
            const { cannotFind } = this.state;

            if (cannotFind) {
                this.setState({
                    cannotFind: false,
                });
            }
        }

        const repository = filteredRepositories[0];

        await retrieveBlames({
            filePath: activeFilePath,
            fileContent: text,
            workspaceId: workspace._id,
            repositoryId: repository._id,
        });

        const { blameChunks } = this.props;

        const { focusedChunk } = this.state;

        vscode.postMessage({
            type: "COMMUNICATE_BLAME",
            payload: {
                blameChunks,
                focusedChunk,
            },
        });

        this.setState({ isLoaded: true });
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
        const { blameChunks, filename } = this.props;

        const { focusedChunk } = this.state;

        return blameChunks.map((chunk, i) => {
            chunk["keyUser"] = "FS";

            chunk._id = i;

            const { start } = chunk;

            const isFocused = focusedChunk == start;

            return (
                <AnnotationCardContainer
                    key={chunk._id}
                    isFocused={isFocused}
                    onClick={() => this.focusChunk(start)}
                    ref={(node) => (this.annotations[start] = node)}
                >
                    <AnnotationCard
                        isFocused={isFocused}
                        filename={filename}
                        chunk={chunk}
                    />
                </AnnotationCardContainer>
            );
        });
    };

    render() {
        const { cannotFind, isLoaded } = this.state;

        return (
            <Container>
                {cannotFind ? <GitAlert /> : this.renderChunkAnnotations()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        global: { activeFilePath, repositoryFullName },
        workspaces,
        blames: { blameChunks },
    } = state;

    return {
        blameChunks: Object.values(blameChunks),
        workspaces,
        activeFilePath,
        filename: activeFilePath ? activeFilePath.split("/").pop() : null,
        repositoryFullName,
    };
};

export default withRouter(
    connect(mapStateToProps, { retrieveBlames })(BlameDisplay)
);

const Container = styled.div`
    height: calc(100vh - 6.5rem);

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
