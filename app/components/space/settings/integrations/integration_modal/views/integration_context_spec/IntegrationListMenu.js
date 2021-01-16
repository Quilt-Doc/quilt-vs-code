import React, { Component } from "react";

import styled from "styled-components";

//elements
import {
    Menu,
    IntegrationItem,
    SubHeader,
} from "../../../../../../../elements";

import { FiChevronDown } from "react-icons/fi";

//constants
import { END_TYPE } from "../../../../../../../constants/constants";

//TODO: REMOVE DUPLICATE LISTS
//TODO: MAKE MENU SCROLLABLE
//TODO: FIX ADD INTEGRATION BUTTON
//TODO: ADD LABEL FOR INTEGRATION NAME
//TODO: CHANGE ADD INTEGRATION BUTTON
//TODO: REMOVE START + END if < 2 lists

class IntegrationListMenu extends Component {
    constructor(props) {
        super(props);
    }

    renderListMenu = () => {
        const { board, type, value, selectValue } = this.props;

        const { lists } = board;

        const label = value
            ? lists.filter((list) => list.id === value)[0].name
            : type;

        const generateMenuButton = (menuContainer) => (
            <Button>
                <SubHeader>{label}</SubHeader>
                <Chevron>
                    <FiChevronDown />
                </Chevron>
                {menuContainer}
            </Button>
        );

        const listItems = lists.map((list, i) => {
            const { id, name } = list;

            return (
                <IntegrationItem
                    key={`${id}`}
                    type={"column"}
                    name={name}
                    marginBottom={i === lists.length - 1 ? "0rem" : null}
                />
            );
        });

        const values = lists.map((list) => list.id);

        const alignRight = type === END_TYPE ? true : false;

        return (
            <Menu
                alignRight={alignRight}
                generateMenuButton={generateMenuButton}
                listItems={listItems}
                values={values}
                selectedValue={value}
                title={`Select ${type} List`}
                listItemOnClick={(id) => {
                    selectValue(id);
                }}
            />
        );
    };

    render() {
        return this.renderListMenu();
    }
}

export default IntegrationListMenu;

const Chevron = styled.div`
    margin-left: auto;

    display: flex;

    align-items: center;

    margin-top: 0.2rem;

    height: 3rem;
`;

const Button = styled.div`
    display: inline-flex;

    height: 3.2rem;

    font-weight: 500;

    font-size: 1.3rem;

    align-items: center;

    /*justify-content: center;*/

    padding: 0rem 1rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*border: 1px solid #6762df;*/

    border-radius: 0.4rem;

    cursor: pointer;

    width: calc(50% - 2rem);

    position: relative;
    /*
    &:last-of-type {
        width: calc(50% - 2rem);
    }*/
`;
