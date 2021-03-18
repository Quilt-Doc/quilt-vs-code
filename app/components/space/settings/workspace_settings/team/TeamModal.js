import React, { Component } from "react";

//styles
import styled from "styled-components";

//components
import {
    Modal,
    Header,
    WrappedSubHeader,
    Input,
    Button,
} from "../../../../../elements";

//email validation
import * as EmailValidator from "email-validator";

//actions
import { sendInvite } from "../../../../../actions/WorkspaceActions";

//redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

class TeamModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
        };
    }

    sendInviteRequest = async () => {
        const {
            sendInvite,
            currentWorkspace,
            workspaceInvites,
            match,
            closeModal,
        } = this.props;

        const { workspaceId } = match.params;

        const email = this.input.value;

        const { memberUsers } = currentWorkspace;

        for (let i = 0; i < memberUsers.length; i++) {
            const { email: userEmail } = memberUsers[i];

            if (email == userEmail) {
                console.log(
                    "Alert: A member of this workspace already has this email."
                );

                return;
            }
        }

        for (let i = 0; i < workspaceInvites.length; i++) {
            const { invitedEmail } = workspaceInvites[i];

            if (email == invitedEmail) {
                console.log(
                    "Alert: An invited member of this workspace already has this email."
                );

                return;
            }
        }

        if (!EmailValidator.validate(email)) {
            // alert("Invalid Email")
            return;
        }

        this.setState({ sending: true });

        await sendInvite({ workspaceId, email });

        this.setState({ sending: false });

        closeModal();
    };

    renderBody = () => {
        const { sending } = this.state;

        return (
            <>
                <Header>Add Your Team Members</Header>
                <WrappedSubHeader>
                    Enter your team member's email to send a request.
                </WrappedSubHeader>
                <Input
                    label={"Member Email Address"}
                    setRef={(node) => (this.input = node)}
                    spellCheck={false}
                    autoFocus={false}
                    placeholder={`Enter Member Email Address`}
                />
                <Button loading={sending} onClick={this.sendInviteRequest}>
                    Send Request
                </Button>
            </>
        );
    };

    render() {
        const { closeModal } = this.props;

        return (
            <Modal closeModal={closeModal}>
                <Container>{this.renderBody()}</Container>
            </Modal>
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

export default withRouter(connect(mapStateToProps, { sendInvite })(TeamModal));

const Container = styled.div`
    padding: 2rem;

    padding-bottom: 3rem;

    display: flex;

    flex-direction: column;
`;
