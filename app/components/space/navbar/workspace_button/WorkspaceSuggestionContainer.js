import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import { SubHeader } from "../../../../elements";

//redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

//icons
import { CgMathPlus } from "react-icons/cg";
import { RiCheckboxCircleFill } from "react-icons/ri";

class WorkspaceSuggestionContainer extends Component {
    renderSuggestions = () => {
        const { workspaces, match } = this.props;

        const { workspaceId } = match.params;

        return workspaces.map((workspace) => {
            const { name, _id } = workspace;

            const initial = name.slice(0, 1).toUpperCase();

            const isSelected = _id == workspaceId;

            return (
                <WorkspaceSuggestion
                    onClick={() => this.selectWorkspace(_id)}
                    key={_id}
                >
                    <WorkspaceButtonLarge>{initial}</WorkspaceButtonLarge>
                    <WorkspaceSuggestionDetail>
                        <SubHeader>{name}</SubHeader>
                    </WorkspaceSuggestionDetail>
                    {isSelected && (
                        <WorkspaceSelected active={true}>
                            <RiCheckboxCircleFill />
                        </WorkspaceSelected>
                    )}
                </WorkspaceSuggestion>
            );
        });
    };

    selectWorkspace = (workspaceId) => {
        const { history, location } = this.props;

        history.push(`/space/${workspaceId}`);
    };

    selectWorkspaceCreation = () => {
        const { history, location } = this.props;

        history.push("/create_workspace");
    };

    renderAddWorkspaceButton = () => {
        return (
            <WorkspaceSuggestion onClick={this.selectWorkspaceCreation}>
                <WorkspaceButtonLarge>
                    <CgMathPlus />
                </WorkspaceButtonLarge>
                <WorkspaceSuggestionDetail>
                    <SubHeader>Add Workspace</SubHeader>
                </WorkspaceSuggestionDetail>
            </WorkspaceSuggestion>
        );
    };

    render() {
        return (
            <WorkspaceContainer>
                {this.renderSuggestions()}
                {this.renderAddWorkspaceButton()}
            </WorkspaceContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const { workspaces } = state;

    return {
        workspaces: Object.values(workspaces),
    };
};

export default withRouter(
    connect(mapStateToProps, {})(WorkspaceSuggestionContainer)
);

const WorkspaceSelected = styled.div`
    width: 2rem;

    margin-left: auto;

    opacity: ${(props) => (props.active ? 1 : 0.2)};

    color: ${(props) => (props.active ? "#19e5be" : "")};

    margin-top: 0.25rem;
`;

const WorkspaceContainer = styled.div`
    border-bottom: 1px solid
        ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;

const WorkspaceSuggestionDetail = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;

    margin-left: 1rem;
`;

const WorkspaceSuggestion = styled.div`
    display: flex;

    align-items: center;

    height: 4.5rem;

    padding: 0rem 1rem;

    &:hover {
        background-color: ${(props) => props.theme.SHADE_3};
    }
`;

const WorkspaceButtonLarge = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    font-weight: 300;

    height: 2.8rem;

    width: 2.8rem;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 1.6rem;

    opacity: 1;

    border-radius: 0.35rem;

    cursor: pointer;

    /*transition: opacity 0.1s ease-in;*/
`;
