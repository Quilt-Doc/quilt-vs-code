import React from "react";

//components
import SpaceNavbar from "./navbar/SpaceNavbar";
import ContextDisplay from "./context_display/ContextDisplay";
import IntegrationPanel from "./settings/integrations/IntegrationPanel";

const Space = () => {
    return (
        <>
            <SpaceNavbar />
            <ContextDisplay />
        </>
    );
};

export default Space;
