import React, { Component } from "react";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";

// components
import { Panel } from "../../../elements";

// react icons
import { FiSearch } from "react-icons/fi";

class ContextSearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
        };
    }

    render() {
        const { setSearchQuery } = this.props;

        const { isFocused } = this.state;

        return (
            <Container>
                <PanelContainer isFocused={isFocused}>
                    <PanelSearchbar>
                        <SearchbarIcon>
                            <FiSearch />
                        </SearchbarIcon>
                        <SearchbarInput
                            onFocus={() => this.setState({ isFocused: true })}
                            onBlur={() => this.setState({ isFocused: false })}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={"Search"}
                        ></SearchbarInput>
                        {/*<Divider />*/}
                    </PanelSearchbar>
                </PanelContainer>
            </Container>
        );
    }
}

export default ContextSearchPanel;

ContextSearchPanel.propTypes = {
    setSearchQuery: PropTypes.func,
};

const Container = styled.div`
    display: flex;
`;

const PanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    width: 10rem;

    margin-left: auto;

    ${(props) =>
        props.isFocused ? `box-shadow: ${props.theme.BOX_SHADOW_1};` : ""};

    ${(props) =>
        props.isFocused
            ? `border: 2px solid ${props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};`
            : "border: 2px solid transparent;"}

    ${(props) =>
        props.isFocused ? `background-color: ${props.theme.SHADE_2};` : ""};

    &:hover {
        box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

        border: 2px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

        background-color: ${(props) => props.theme.SHADE_2};
    }

    transition: background-color 0.2s ease-in, box-shadow 0.2s ease-in;
`;

const PanelSearchbar = styled.div`
    height: 3.3rem;

    padding: 0rem 0.7rem;

    display: flex;

    align-items: center;

    margin-left: auto;
`;

const SearchbarIcon = styled.div`
    align-items: center;

    justify-content: center;

    min-width: 2rem;

    font-size: 1.5rem;

    display: flex;

    opacity: 0.7;

    margin-top: -0.1rem;
`;

const SearchbarInput = styled.input`
    height: 100%;

    width: 100%;

    font-size: 1.2rem;

    margin-left: 0.3rem;

    border: none;

    outline: none;

    &:focus {
        border: none;

        outline: none;
    }

    color: ${(props) => props.theme.TEXT_COLOR};

    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    &::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;

        color: ${(props) => props.theme.TEXT_COLOR};

        opacity: 0.7;
    }

    display: flex;

    align-items: center;

    background-color: transparent;
`;

const Divider = styled.div`
    width: 1.5rem;

    height: 
    color: white;

    opacity: 0.7;
`;
