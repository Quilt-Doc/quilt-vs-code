import React, { Component } from "react";

//components
import IntegrationPanel from "./integrations/IntegrationPanel";
import GeneralWorkspaceSettings from "./GeneralWorkspaceSettings";
import TeamWorkspaceSettings from "./team/TeamWorkspaceSettings";
import DeleteWorkspacePanel from "./DeleteWorkspacePanel";

class WorkspaceSettings extends Component {
    render() {
        return (
            <>
                <GeneralWorkspaceSettings />
                <IntegrationPanel />
                <TeamWorkspaceSettings />
                <DeleteWorkspacePanel />
            </>
        );
    }
}

export default WorkspaceSettings;
