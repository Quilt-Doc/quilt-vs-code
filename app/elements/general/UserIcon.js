import styled from "styled-components";

const UserIcon = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    height: 3.5rem;

    width: 3.5rem;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 0.4rem;

    letter-spacing: 1.5px;

    margin-right: 1.5rem;

    &:last-of-type {
        margin-right: 0rem;
    }

    margin-top: -0.7rem;
`;

export default UserIcon;
