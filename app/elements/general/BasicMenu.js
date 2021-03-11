import React, { Component } from "react";

//styles
import styled from "styled-components";

class BasicMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    handleButtonClick = () => {
        const { isOpen } = this.state;

        if (!isOpen) this.setState({ isOpen: true });
    };

    handleOutsideClick = (e) => {
        if (this.menuRef && !this.menuRef.contains(e.target)) {
            e.stopPropagation();

            e.preventDefault();

            this.setState({ isOpen: false });
        }
    };

    renderMenu = () => {
        const { generateMenuButton } = this.props;

        const { isOpen } = this.state;

        const menuContainer = isOpen && <>{this.renderMenuContainer()}</>;

        let menuButton = generateMenuButton(menuContainer);

        menuButton = React.cloneElement(menuButton, {
            onClick: this.handleButtonClick,
            ref: (node) => (this.buttonRef = node),
        });

        return menuButton;
    };

    renderMenuContainer = () => {
        const { alignRight, width, marginTop, menuContents } = this.props;

        return (
            <>
                <MenuBackground onMouseDown={this.handleOutsideClick} />
                <MenuContainer
                    alignRight={alignRight}
                    ref={(node) => (this.menuRef = node)}
                    width={width}
                    marginTop={marginTop}
                >
                    {menuContents}
                </MenuContainer>
            </>
        );
    };

    render() {
        return <>{this.renderMenu()}</>;
    }
}

export default BasicMenu;

const MenuBackground = styled.div`
    position: fixed;

    z-index: 1;

    left: 0;

    top: 0;

    width: 100vw;

    height: 100vh;

    overflow: hidden;

    background-color: transparent;
`;

const MenuContainer = styled.div`
    right: ${(props) => (props.alignRight ? "0" : "")};

    left: ${(props) => (props.alignRight ? "" : "0")};

    top: 0;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_MENU};

    position: absolute;

    z-index: 2;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    border-radius: 0.4rem;

    width: ${(props) => (props.width ? props.width : "70vw")};

    margin-top: ${(props) => props.marginTop};
`;
