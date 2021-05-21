import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";
import chroma from "chroma-js";

//icons
import { IntegrationSource, Header, SubHeader } from "../../../../elements";

//icons
import { RiGithubFill, RiGitlabFill, RiTrelloFill } from "react-icons/ri";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

//constants
const TRELLO_ICON_SIZE = "2.1rem";

class ContextPanelNavbar extends Component {
    renderHeader = () => {
        const { model } = this.props;

        const modelText =
            model == "pullRequests"
                ? "Pull Requests"
                : model == "commits"
                ? "Commits"
                : model == "branches"
                ? "Branches"
                : "Tickets";

        return <Header marginBottom="0rem">{modelText}</Header>;
    };

    renderPagination = () => {
        const { changePage, page, data } = this.props;

        console.log("data length", data.length);

        console.log("page max", page * 4 + 4);

        const isRightActive = !(page * 4 + 4 >= data.length);

        const isLeftActive = !(page == 0);

        return (
            <PaginationContainer>
                <ArrowContainer
                    onClick={() => {
                        if (isLeftActive) changePage(page - 1);
                    }}
                    isActive={isLeftActive}
                >
                    <HiArrowLeft />
                </ArrowContainer>
                <PageNumber>{page + 1}</PageNumber>
                <ArrowContainer
                    onClick={() => {
                        if (isRightActive) changePage(page + 1);
                    }}
                    isActive={isRightActive}
                >
                    <HiArrowRight />
                </ArrowContainer>
            </PaginationContainer>
        );
    };
    render() {
        return (
            <ContextPanelNavbarContainer>
                <ContextListItemIconContainer>
                    <ContextListItemIcon>
                        <RiGithubFill />
                    </ContextListItemIcon>
                </ContextListItemIconContainer>
                {this.renderHeader()}
                {this.renderPagination()}
            </ContextPanelNavbarContainer>
        );
    }
}

export default ContextPanelNavbar;

ContextPanelNavbar.propTypes = {
    source: PropTypes.string,
    model: PropTypes.string,
    changePage: PropTypes.func,
    page: PropTypes.number,
    data: PropTypes.array,
};

const PaginationContainer = styled.div`
    margin-left: auto;

    display: flex;

    align-items: center;
`;

const ArrowContainer = styled.div`
    background-color: ${(props) => props.theme.SHADE_8};

    min-height: 2.5rem;

    min-width: 2.5rem;

    border-radius: 0.5rem;

    display: flex;

    justify-content: center;

    align-items: center;

    opacity: ${(props) => (!props.isActive ? "0.4" : "1")};

    cursor: ${(props) => (props.isActive ? "pointer" : "default")};

    &:hover {
        box-shadow: ${(props) => (props.isActive ? props.theme.BOX_SHADOW_1 : "")};

        border: ${(props) =>
            props.isActive ? `1px solid ${props.theme.SHADE_8}` : ""};

        background-color: ${(props) =>
            props.isActive ? props.theme.SHADE_10 : props.theme.SHADE_8};
    }

    transition: background-color 0.2s ease-in, box-shadow 0.2s ease-in;
`;

const PageNumber = styled(SubHeader)`
    margin-left: 1rem;

    margin-right: 1rem;

    font-weight: 500;

    font-size: 1.23rem;
`;

const ContextListItemIconContainer = styled.div`
    min-height: 3.5rem;

    min-width: 3.5rem;

    background-color: ${(props) => props.theme.SHADE_8};

    border-radius: 0.7rem;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-right: 0.9rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};
`;

const ContextListItemIcon = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    color: ${(props) => props.color};

    font-size: ${(props) => (props.size ? props.size : "2.2rem")};
    /*
    margin-top: ${(props) => (props.top ? props.top : "0rem")};

    font-size: ${(props) => (props.size ? props.size : "2.1rem")};

    margin-left: ${(props) => (props.left ? props.left : "0.5rem")};

    color: ${(props) =>
        props.color}; /* #4284f4*/ /*#4284f4 - doc  #f27448 - card  #0D9D58 - spreadsheet*/

    /*opacity: 0.7;*/
`;

const SourceIcon = styled.div`
    font-size: 2.3rem;

    margin-right: 1rem;

    display: flex;

    align-items: center;

    justify-content: center;

    height: 3rem;

    width: 3rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;

const ContextPanelHeader = styled.div`
    border-radius: 0.6rem;

    display: flex;

    align-items: center;

    padding: 0.5rem 1rem;

    margin-bottom: 0.5rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};

    margin-bottom: 0.5rem;
`;

const IntegrationModelSelection = styled.div`
    margin-left: auto;

    display: flex;

    align-items: center;
`;

const ContextPanelNavbarContainer = styled.div`
    width: 100%;

    display: flex;

    align-items: center;

    /*padding: 1.7rem 1.7rem;*/

    opacity: 0.9;

    margin-bottom: 0.5rem;
`;

const ContextPanelIconContainer = styled.div`
    height: 3.5rem;

    display: flex;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    /*${chroma("#090B10").set("hsl.l", "+0.18")};*/ /*REPLACE COLOR*/

    align-items: center;

    justify-content: center;

    width: 5rem;

    border-radius: 0.8rem;
`;

const ContextPanelIcon = styled.div`
    font-size: ${TRELLO_ICON_SIZE};

    opacity: 0.85;
`;
