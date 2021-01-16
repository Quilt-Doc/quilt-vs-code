import React, { Component } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//icons
import { DiGoogleDrive } from "react-icons/di";
import { RiGithubFill, RiTrelloFill } from "react-icons/ri";

//constants
const TRELLO_ICON_SIZE = "2.1rem";
const GOOGLE_DRIVE_ICON_SIZE = "2.5rem";

class ContextPanelNavbar extends Component {
    render() {
        const { integration } = this.props;

        return (
            <ContextPanelNavbarContainer>
                <ContextPanelIconContainer>
                    <ContextPanelIcon>
                        {integration === "trello" ? (
                            <RiTrelloFill />
                        ) : (
                            <RiGithubFill />
                        )}
                    </ContextPanelIcon>
                </ContextPanelIconContainer>
            </ContextPanelNavbarContainer>
        );
    }
}

export default ContextPanelNavbar;

const ContextPanelNavbarContainer = styled.div`
    width: 100%;

    display: flex;

    align-items: center;

    padding: 1rem 1rem;

    opacity: 0.85;
`;

const ContextPanelIconContainer = styled.div`
    height: 3.5rem;

    display: flex;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*${chroma("#090B10").set("hsl.l", "+0.18")};*/ /*REPLACE COLOR*/

    align-items: center;

    justify-content: center;

    width: 5rem;

    border-radius: 0.8rem;
`;

const ContextPanelIcon = styled.div`
    font-size: ${TRELLO_ICON_SIZE};

    opacity: 0.85;
`;
