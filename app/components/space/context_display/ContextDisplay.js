import React from "react";

import ContextPanel from "./context_panel/ContextPanel";

import { connect } from "react-redux";

const ContextDisplay = ({ repositoryFullName, activeFilePath }) => {
    useEffect(() => {
        console.log("PULL IN NEW DATA FOR NEW FILE HERE");
    }, [repositoryFullName, activeFilePath]);

    return <ContextPanel />;
};

const mapStateToProps = (state) => {
    const {
        global: { repositoryFullName, activeFilePath },
    } = state;

    return { repositoryFullName, activeFilePath };
};

export default connect(mapStateToProps, {})(ContextDisplay);
