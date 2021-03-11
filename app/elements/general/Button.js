import React, { Component } from "react";

//components
import Loader from "react-loader-spinner";

//styles
import styled from "styled-components";

class Button extends Component {
    modifiedOnClick = () => {
        const { loading, onClick } = this.props;

        if (!loading) {
            onClick();
        } else {
            console.log("Loading.. Please wait");

            return;
        }
    };

    render() {
        const { children, marginTop, loading, borderColor } = this.props;

        const content = loading ? (
            <LoaderContainer>
                <Loader type="Oval" color="white" height={20} width={20} />
            </LoaderContainer>
        ) : (
            children
        );

        return (
            <ButtonContainer
                borderColor={borderColor}
                onClick={this.modifiedOnClick}
                marginTop={marginTop}
            >
                {content}
            </ButtonContainer>
        );
    }
}

export default Button;

const LoaderContainer = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    margin-top: 0.1rem;
`;

const ButtonContainer = styled.div`
    display: inline-flex;

    height: 3.5rem;

    font-weight: 500;

    font-size: 1.3rem;

    align-items: center;

    justify-content: center;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    &:hover {
        background-color: ${(props) =>
            props.theme.PRIMARY_ACCENT_COLOR_SHADE_2};
    }

    border: 1px solid
        ${(props) => (props.borderColor ? props.borderColor : "#6762df")};

    border-radius: 0.4rem;

    cursor: pointer;

    margin-top: ${(props) => (props.marginTop ? props.marginTop : "3rem")};
`;
