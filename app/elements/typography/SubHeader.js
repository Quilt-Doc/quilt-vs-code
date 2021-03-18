import styled from "styled-components";

const SubHeader = styled.div`
    font-size: 1.23rem;

    font-weight: 500;

    line-height: 1.8;

    opacity: 0.8;

    margin-bottom: ${(props) => props.marginBottom};

    overflow-wrap: break-word;

    ${(props) => (props.noWrap ? "text-overflow: ellipsis;" : "")}

    ${(props) => (props.noWrap ? "white-space: nowrap;" : "")}

    ${(props) => (props.noWrap ? "overflow: hidden;" : "")}
`;

export default SubHeader;
