import React, { Component } from "react";

//redux
import { connect } from "react-redux";

//actions
import { getWorkspace } from "../../../../actions/WorkspaceActions";
import { editUser } from "../../../../actions/UserActions";

//components
import { SubHeader, Loader } from "../../../../elements";

//router
import { withRouter } from "react-router-dom";

class WaitCreation extends Component {
    componentDidMount = async () => {
        await this.pollWorkspace();

        setTimeout(this.pollWorkspace, 2000);
    };

    pollWorkspace = async () => {
        const { workspaceId, getWorkspace } = this.props;

        await getWorkspace({ workspaceId });

        const {
            workspace: { setupComplete },
        } = this.props;

        if (setupComplete) {
            const {
                user: { _id: userId },
                editUser,
                history,
                location,
                onboarding,
            } = this.props;

            if (onboarding) {
                await editUser({
                    userId,
                    isOnboarded: true,
                });
            }

            history.push(`/space/${workspaceId}`);
        } else {
            setTimeout(this.pollWorkspace, 2000);
        }
    };

    render() {
        return (
            <>
                <SubHeader>Creating your workspace...</SubHeader>
                <Loader />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { workspaceId } = ownProps;

    const {
        workspaces,
        auth: { user },
    } = state;

    return {
        workspace: workspaces[workspaceId],
        user,
    };
};

export default withRouter(
    connect(mapStateToProps, { getWorkspace, editUser })(WaitCreation)
);
