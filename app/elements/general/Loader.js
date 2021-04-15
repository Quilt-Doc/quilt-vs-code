import styled from "styled-components";

import { Oval } from "svg-loaders-react";

const Loader = ({ width, height, type, color, marginTop }) => {
    if (!width) width = "100%";

    if (!height) height = "10rem";

    return (
        <LoaderContainer marginTop={marginTop}>
            <Oval stroke={color ? color : "white"} />
        </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.div`
    width: ${(props) => props.width};

    height: ${(props) => props.height};

    padding-top: 2rem;

    margin-top: ${(props) => props.marginTop};

    display: flex;

    justify-content: center;

    align-items: center;
`;
