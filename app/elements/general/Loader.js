import styled from "styled-components";

import { Oval } from "svg-loaders-react";

const Loader = ({ width, height, type, color }) => {
    if (!width) width = "100%";

    if (!height) height = "10rem";

    return (
        <LoaderContainer>
            <Oval stroke={color ? color : "white"} />
        </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.div`
    width: ${(props) => props.width};

    height: ${(props) => props.height};

    padding-top: 2rem;

    display: flex;

    justify-content: center;

    align-items: center;
`;
