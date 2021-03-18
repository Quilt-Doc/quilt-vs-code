import React from "react";

//styles
import styled from "styled-components";

//vscode api
import vscode from "../../vscode/vscode";

//types
import { OPEN_BROWSER } from "../../vscode/types/messageTypes";

const ExternalLink = ({ link, text }) => {
    const handleLinkClick = () => {
        vscode.postMessage({
            type: OPEN_BROWSER,
            payload: {
                url: link,
            },
        });
    };

    return (
        <ExternalLinkContainer onClick={handleLinkClick}>
            {text}
        </ExternalLinkContainer>
    );
};

export default ExternalLink;

const ExternalLinkContainer = styled.div`
    color: ${(props) => props.theme.SECONDARY_COLOR};

    text-decoration: underline;

    cursor: pointer;
`;
