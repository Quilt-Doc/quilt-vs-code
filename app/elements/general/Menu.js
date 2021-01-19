import React, { Component } from "react";
import { SubHeader } from "../index";

import styled from "styled-components";

// takes a list item as a component

class Menu extends Component {
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
        const { alignRight, title } = this.props;

        return (
            <>
                <MenuBackground onMouseDown={this.handleOutsideClick} />
                <MenuContainer
                    alignRight={alignRight}
                    ref={(node) => (this.menuRef = node)}
                >
                    <SubHeader marginBottom={"1rem"}>{title}</SubHeader>
                    <ListItems>{this.renderListItems()}</ListItems>
                </MenuContainer>
            </>
        );
    };

    handleListItemClick = (value) => {
        const { listItemOnClick, multi } = this.props;

        if (!multi) this.setState({ isOpen: false });

        listItemOnClick(value);
    };

    renderListItems = () => {
        const {
            listItems,
            values,
            selectedValue,
            selectedValues,
            multi,
        } = this.props;

        return listItems.map((listItem, i) => {
            let active;

            if (multi) {
                active = selectedValues.has(values[i]);
            } else {
                active = values[i] === selectedValue ? true : null;
            }

            return React.cloneElement(listItem, {
                onClick: () => this.handleListItemClick(values[i]),
                active,
            });
        });
    };

    render() {
        return <>{this.renderMenu()}</>;
    }
}

export default Menu;

const MenuContainer = styled.div`
    right: ${(props) => (props.alignRight ? "0" : "")};

    left: ${(props) => (props.alignRight ? "" : "0")};

    top: 0;

    padding: 1rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_MENU};

    position: absolute;

    z-index: 1;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    border-radius: 0.4rem;

    width: 70vw;
`;

const ListItems = styled.div`
    max-height: 28rem;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const MenuBackground = styled.div`
    position: fixed;

    z-index: 0;

    left: 0;

    top: 0;

    width: 100%;

    height: 100%;

    overflow: hidden;

    background-color: transparent;
`;
