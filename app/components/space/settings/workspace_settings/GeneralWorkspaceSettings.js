import React, { Component } from "react";

// redux
import { connect } from "react-redux";

//actions
import { editWorkspace } from "../../../../actions/WorkspaceActions";

// router
import { withRouter } from "react-router-dom";

//styled
import styled from "styled-components";

//components
import {
    Panel,
    Header,
    WrappedSubHeader,
    Input,
    Button,
} from "../../../../elements";

class GeneralWorkspaceSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updating: false,
        };
    }

    updateWorkspaceName = async () => {
        const { editWorkspace, match } = this.props;

        const { workspaceId } = match.params;

        const name = this.input.value;

        this.setState({ updating: true });

        await editWorkspace({ workspaceId, name });

        this.setState({ updating: false });
    };

    render() {
        const { updating } = this.state;

        const {
            currentWorkspace: { name },
        } = this.props;

        return (
            <PanelContainer>
                <Header>General</Header>
                <WrappedSubHeader>
                    Change the name of your workspace.
                </WrappedSubHeader>
                <Input
                    label={"Workspace Name"}
                    setRef={(node) => (this.input = node)}
                    spellCheck={false}
                    autoFocus={false}
                    defaultValue={name}
                    placeholder={`Enter Workspace Name`}
                />
                <Button loading={updating} onClick={this.updateWorkspaceName}>
                    Update
                </Button>
            </PanelContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { workspaces } = state;

    const { workspaceId } = ownProps.match.params;

    console.log("CURRENT WORKSPACE", workspaces[workspaceId]);

    return {
        currentWorkspace: workspaces[workspaceId],
    };
};

export default withRouter(
    connect(mapStateToProps, { editWorkspace })(GeneralWorkspaceSettings)
);

const PanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;
`;
