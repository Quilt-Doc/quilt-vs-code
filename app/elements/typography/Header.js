import styled from "styled-components";

const Header = styled.div`
    font-size: 1.45rem;

    font-weight: 500;

    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : "1rem"};
`;

export default Header;
