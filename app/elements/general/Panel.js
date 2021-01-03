import styled from "styled-components";

const Panel = styled.div`
    width: 100%;

    border-radius: 0.7rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    /* box-shadow: ${(props) => props.theme.BOX_SHADOW_1};*/
`;

export default Panel;
