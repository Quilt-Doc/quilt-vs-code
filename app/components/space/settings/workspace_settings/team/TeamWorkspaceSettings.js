import React, { Component } from "react";

// styles
import styled from "styled-components";

//components
import {
    Panel,
    Header,
    WrappedSubHeader,
    SubHeader,
} from "../../../../../elements";
import TeamModal from "./TeamModal";

//actions
import { retrieveWorkspaceInvites } from "../../../../../actions/WorkspaceInviteActions";

//redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

//icons
import { CgMathPlus } from "react-icons/cg";
import { IoIosPerson } from "react-icons/io";

class TeamWorkspaceSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    componentDidMount = async () => {
        const { retrieveWorkspaceInvites, match } = this.props;

        const { workspaceId } = match.params;

        await retrieveWorkspaceInvites({ workspaceId });
    };

    renderTeamMembers = () => {
        const {
            currentWorkspace: { memberUsers },
            workspaceInvites,
        } = this.props;

        let actualUsers = memberUsers.map((user) => {
            const { firstName, lastName, email } = user;

            const name = `${firstName} ${lastName}`;

            const initial = name.charAt(0);

            return (
                <MemberContainer key={name}>
                    <MemberIcon>{initial}</MemberIcon>
                    <MemberDetail>
                        <SubHeader marginBottom={"0.5rem"}>{name}</SubHeader>
                        <SubHeader>{email}</SubHeader>
                    </MemberDetail>
                </MemberContainer>
            );
        });

        let invites = workspaceInvites.map((invite) => {
            const { invitedEmail, _id } = invite;

            return (
                <MemberContainer opaque={true} key={_id}>
                    <MemberIcon>
                        <IoIosPerson style={{ fontSize: "1.6rem" }} />
                    </MemberIcon>
                    <MemberDetail>
                        <SubHeader marginBottom={"0.5rem"}>
                            {"Pending Invite.."}
                        </SubHeader>
                        <SubHeader>{invitedEmail}</SubHeader>
                    </MemberDetail>
                </MemberContainer>
            );
        });

        return [...actualUsers, ...invites];
    };

    render() {
        const { isModalOpen } = this.state;
        return (
            <>
                <PanelContainer>
                    <PanelNavbar>
                        <Header>Team Members</Header>
                        <PanelAddButton
                            onClick={() => {
                                this.setState({ isModalOpen: true });
                            }}
                        >
                            <CgMathPlus />
                        </PanelAddButton>
                    </PanelNavbar>
                    <WrappedSubHeader>
                        Add team members to your workspace.
                    </WrappedSubHeader>
                    {this.renderTeamMembers()}
                </PanelContainer>
                {isModalOpen && (
                    <TeamModal
                        closeModal={() => this.setState({ isModalOpen: false })}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { workspaces, workspaceInvites } = state;

    const { workspaceId } = ownProps.match.params;

    return {
        currentWorkspace: workspaces[workspaceId],
        workspaceInvites: Object.values(workspaceInvites),
    };
};

export default withRouter(
    connect(mapStateToProps, { retrieveWorkspaceInvites })(
        TeamWorkspaceSettings
    )
);

const PanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;
`;

const PanelNavbar = styled.div`
    display: flex;

    position: relative;
    /*align-items: center;*/

    /*margin-bottom: 1.2rem;*/
`;

const PanelAddButton = styled.div`
    height: 3rem;

    width: 3rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*margin-left: auto;*/

    position: absolute;

    right: 0;

    top: -27%;

    font-size: 1.55rem;

    border-radius: 0.4rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }

    cursor: pointer;
`;

const MemberContainer = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    margin-top: 2rem;

    border-radius: 0.4rem;

    padding: 1rem;

    display: flex;

    opacity: ${(props) => (props.opaque ? "0.6" : "1")};
`;

const MemberIconContainer = styled.div`
    width: 2rem;
`;

const MemberIcon = styled.div`
    height: 3rem;

    width: 3rem;

    display: flex;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    font-size: 1.55rem;

    border-radius: 0.4rem;

    margin-right: 1.5rem;
`;

const MemberDetail = styled.div`
    display: flex;

    flex-direction: column;
`;
