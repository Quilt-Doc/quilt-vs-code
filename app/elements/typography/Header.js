import styled from "styled-components";

const Header = styled.div`
    font-size: 1.45rem;

    font-weight: 500;

    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : "1rem"};

    overflow-wrap: break-word;

    ${(props) => (props.noWrap ? "text-overflow: ellipsis;" : "")}

    ${(props) => (props.noWrap ? "white-space: nowrap;" : "")}

    ${(props) => (props.noWrap ? "overflow: hidden;" : "")}
`;

export default Header;
