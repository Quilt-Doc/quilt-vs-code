import React, { Component } from "react";

import { Alert } from "../../../elements";

import { AiFillFileUnknown } from "react-icons/ai";

class GitAlert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
        };
    }

    render() {
        const { active } = this.state;

        return active ? (
            <Alert
                isPanel={true}
                actions={[]}
                icon={<AiFillFileUnknown />}
                header={"The current file could not be found."}
                subheader={
                    <>
                        <div>
                            Some things you could try to view this display:
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                            Open a file if there is none selected.
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            Integrate the repository of the opened file.
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                            Refresh this page or the extension.
                        </div>
                    </>
                }
            />
        ) : null;
    }
}

export default GitAlert;
