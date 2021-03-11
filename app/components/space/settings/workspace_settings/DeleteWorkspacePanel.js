import React, { Component } from "react";

// styles
import styled from "styled-components";

//actions
import { deleteWorkspace } from "../../../../actions/WorkspaceActions";

//components
import {
    Panel,
    Header,
    WrappedSubHeader,
    Input,
    Button,
} from "../../../../elements";

//redux
import { connect } from "react-redux";

//router
import { withRouter } from "react-router-dom";

class DeleteWorkspacePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleting: false,
        };
    }

    deleteWorkspace = async () => {
        const { match, deleteWorkspace } = this.props;

        const { workspaceId } = match.params;

        this.setState({ deleting: true });

        await deleteWorkspace({ workspaceId });

        history.push("/space");
    };

    render() {
        const { deleting } = this.state;

        return (
            <PanelContainer>
                <Header>Danger Zone</Header>
                <WrappedSubHeader>
                    Delete your workspace by clicking the button below.
                </WrappedSubHeader>
                <Button
                    onClick={this.deleteWorkspace}
                    borderColor={"#ef3b34"}
                    loading={deleting}
                >
                    Delete Workspace
                </Button>
            </PanelContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { workspaces } = state;

    const { workspaceId } = ownProps.match.params;

    return {
        currentWorkspace: workspaces[workspaceId],
    };
};

export default withRouter(
    connect(mapStateToProps, { deleteWorkspace })(DeleteWorkspacePanel)
);

const PanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;

    margin-bottom: 10rem;
`;
