import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import { SubHeader, BasicMenu } from "../../../../elements";
import WorkspaceSuggestionContainer from "./WorkspaceSuggestionContainer";

//actions
import { logoutUser } from "../../../../actions/AuthActions";

//redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

class WorkspaceButton extends Component {
    renderWorkspaceButton = () => {
        const menuContents = this.renderMenuContents();

        return (
            <BasicMenu
                generateMenuButton={this.generateWorkspaceButton}
                menuContents={menuContents}
                width={"20rem"}
                marginTop={"3.5rem"}
            />
        );
    };

    generateWorkspaceButton = (menuContainer) => {
        return (
            <WorkspaceButtonContainer>
                Q{menuContainer}
            </WorkspaceButtonContainer>
        );
    };

    logoutUser = () => {
        const { logoutUser, history } = this.props;

        logoutUser();

        history.push("/login");
    };

    routeSettings = (suffix) => {
        const { history, match } = this.props;

        const { workspaceId } = match.params;

        history.push(`/space/${workspaceId}/settings/${suffix}`);
    };

    renderMenuContents = () => {
        return (
            <>
                <WorkspaceSuggestionContainer />
                <ThinButton onClick={() => this.routeSettings("workspace")}>
                    <SubHeader>Workspace Settings</SubHeader>
                </ThinButton>
                <ThinButton onClick={() => this.routeSettings("user")}>
                    <SubHeader>Personal Settings</SubHeader>
                </ThinButton>
                <ThinButton onClick={this.logoutUser}>
                    <SubHeader>Log out</SubHeader>
                </ThinButton>
            </>
        );
    };

    render() {
        return this.renderWorkspaceButton();
    }
}

const mapStateToProps = () => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, { logoutUser })(WorkspaceButton)
);

const ThinButton = styled.div`
    height: 3.5rem;

    display: flex;

    align-items: center;

    &:hover {
        background-color: ${(props) => props.theme.SHADE_3};
    }

    padding: 0rem 1.5rem;
`;

const SpaceNavbarButton = styled.div`
    margin-right: 2.2rem;

    height: 2.8rem; /*2.8*/

    width: 2.8rem;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7rem")};

    opacity: ${(props) => (props.active ? 1 : 0.4)};

    border-radius: 0.5rem;

    &:hover {
        opacity: 1;
    }

    cursor: pointer;

    transition: opacity 0.1s ease-in;

    &:last-of-type {
        margin-right: 0rem;
    }
`;

const WorkspaceButtonContainer = styled(SpaceNavbarButton)`
    font-weight: 300;

    font-size: 1.6rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    opacity: 1;

    min-width: 2.8rem;

    border-radius: 0.35rem;

    position: relative;
`;
