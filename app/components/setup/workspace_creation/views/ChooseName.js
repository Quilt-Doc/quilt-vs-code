import React, { Component } from "react";

//react-redux
import { connect } from "react-redux";

//styles
import styled from "styled-components";

//actions
import { createWorkspace } from "../../../../actions/WorkspaceActions";

//components
import { SubHeader, Input, Button } from "../../../../elements";

//router
import { withRouter } from "react-router-dom";

class ChooseName extends Component {
    createWorkspace = async () => {
        const {
            installations,
            createWorkspace,
            user: { _id: creatorId, profileId, firstName },
            active,
            setCreatedWorkspaceId,
            isPublic,
        } = this.props;

        let parameters = {};

        if (!isPublic) {
            parameters.installationId = installations.filter(
                (inst) =>
                    inst.account.type == "User" && inst.account.id == profileId
            )[0].id;
        } else {
            parameters.public = true;
        }

        parameters.name =
            this.input.value !== "" ? this.input.value : `${firstName}'s Quilt`;

        console.log("Parameters to Workspace Creation", {
            ...parameters,
            creatorId,
            repositoryIds: active,
        });

        const workspace = await createWorkspace(
            {
                ...parameters,
                creatorId,
                repositoryIds: active,
            },
            true
        );

        console.log("WORKSPACE", workspace);

        if (workspace) {
            setCreatedWorkspaceId(workspace._id);

            const { history, onboarding } = this.props;

            const route = `${
                onboarding ? "/onboard" : ""
            }/create_workspace/wait_creation`;

            history.push(route);
        } else {
            console.log("USER MESSAGE: ERROR");
        }
    };

    render() {
        const {
            user: { firstName },
        } = this.props;

        return (
            <>
                <SubHeader>Give your personal workspace a name.</SubHeader>
                <Form>
                    <Input
                        label={"Workspace Name"}
                        setRef={(node) => (this.input = node)}
                        spellCheck={false}
                        autoFocus={true}
                        placeholder={`${firstName}'s Quilt`}
                    />
                </Form>
                <Button onClick={this.createWorkspace}>Create Workspace</Button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        auth: { user },
        github: { installations },
    } = state;

    return {
        user,
        installations,
    };
};

export default withRouter(
    connect(mapStateToProps, { createWorkspace })(ChooseName)
);

const Form = styled.div`
    display: flex;

    flex-direction: column;
`;
