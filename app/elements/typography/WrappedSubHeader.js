import styled from "styled-components";

const WrappedSubHeader = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    opacity: 0.8;

    margin-bottom: ${(props) => props.marginBottom};

    overflow-wrap: break-word;
`;

export default WrappedSubHeader;
