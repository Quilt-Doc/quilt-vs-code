import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

import { IntegrationSource } from "../../../../elements";

//constants
const TRELLO_ICON_SIZE = "2.1rem";

class ContextPanelNavbar extends Component {
    render() {
        const { source } = this.props;

        return (
            <ContextPanelNavbarContainer>
                <IntegrationSource
                    large={true}
                    width={"5.5rem"}
                    borderRadius={"0.5rem"}
                    type={source}
                />
            </ContextPanelNavbarContainer>
        );
    }
}

export default ContextPanelNavbar;

ContextPanelNavbar.propTypes = {
    source: PropTypes.string,
};

const IntegrationModelSelection = styled.div`
    margin-left: auto;

    display: flex;

    align-items: center;
`;

const ContextPanelNavbarContainer = styled.div`
    width: 100%;

    display: flex;

    align-items: center;

    padding: 1.7rem 1.7rem;

    padding-bottom: 1.7rem;

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
