import React from "react";
import PropTypes from "prop-types";

// styles
import styled from "styled-components";

// components
import { Oval } from "svg-loaders-react";

const Loader = ({ width, height, color, marginTop }) => {
    if (!width) width = "100%";

    if (!height) height = "10rem";

    return (
        <LoaderContainer height={height} marginTop={marginTop}>
            <Oval stroke={color ? color : "white"} />
        </LoaderContainer>
    );
};

export default Loader;

Loader.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
    marginTop: PropTypes.string,
};

const LoaderContainer = styled.div`
    width: ${(props) => props.width};

    height: ${(props) => props.height};

    padding-top: 2rem;

    margin-top: ${(props) => props.marginTop};

    display: flex;

    justify-content: center;

    align-items: center;
`;
