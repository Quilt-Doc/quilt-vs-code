import React, { Component } from "react";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

import {
    RiFileList2Fill,
    RiLayoutTop2Fill,
    RiFileExcel2Fill,
} from "react-icons/ri";

class ContextListItem extends Component {
    renderIcon = () => {
        return (
            <ContextListItemIcon>
                <RiFileList2Fill />
            </ContextListItemIcon>
        );
    };

    renderContent = () => {
        return (
            <ContextListItemContent>
                <ContextListItemHeader>Marketing assets</ContextListItemHeader>
                <ContextListItemSubHeader>John Smith</ContextListItemSubHeader>
            </ContextListItemContent>
        );
    };

    renderDate = () => {
        return <ContextListItemDate>11/25/2020</ContextListItemDate>;
    };

    render() {
        return (
            <>
                <ContextListItemContainer>
                    {this.renderIcon()}
                    {this.renderContent()}
                    {this.renderDate()}
                </ContextListItemContainer>
            </>
        );
    }
}

export default ContextListItem;

const ContextListItemContainer = styled.div`
    height: 5.3rem;

    &:first-of-type {
        margin-top: 0.7rem;
    }

    width: 100%;

    display: flex;

    padding: 1.15rem 0.5rem;

    padding-right: 1.5rem;

    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.HOVER_COLOR};
    }
`;

const ContextListItemIcon = styled.div`
    height: 3rem;

    width: 4rem;

    display: flex;

    justify-content: center;

    margin-top: 0.05rem;

    font-size: 2rem;

    /*margin-left: 1rem;*/

    color: #4284f4; /*#4284f4 - doc  #f27448 - card  #0D9D58 - spreadsheet*/

    opacity: 0.5;
`;

const ContextListItemContent = styled.div`
    margin-left: 0.3rem;
`;

const ContextListItemHeader = styled.div`
    font-weight: 600;

    opacity: 0.7;

    font-size: 1.2rem;

    margin-bottom: 0.5rem;
`;

const ContextListItemSubHeader = styled.div`
    font-weight: 500;

    opacity: 0.5;

    font-size: 1rem;
`;

const ContextListItemDate = styled.div`
    font-weight: 500;

    opacity: 0.5;

    font-size: 1rem;

    margin-left: auto;

    margin-top: 0.1rem;
`;
