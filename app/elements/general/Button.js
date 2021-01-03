import styled from "styled-components";

const Button = styled.div`
    display: inline-flex;

    height: 3.5rem;

    font-weight: 500;

    font-size: 1.3rem;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border: 1px solid #6762df;

    border-radius: 0.4rem;

    cursor: pointer;

    margin-top: ${(props) => (props.marginTop ? props.marginTop : "3rem")};
`;

export default Button;
