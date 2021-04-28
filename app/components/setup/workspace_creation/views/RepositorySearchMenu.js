import React, { Component } from "react";

import styled from "styled-components";

//components
import { SubHeader, Loader } from "../../../../elements";

//icons
import { FiSearch } from "react-icons/fi";

class RepositorySearchMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false,
            searchTimeout: null,
            isSearching: true,
        };
    }

    renderMenu = () => {
        const { renderRepositories } = this.props;

        const { isSearching } = this.state;

        return (
            <>
                <MenuBackground onMouseDown={this.handleOutsideClick} />
                <SearchbarMenu
                    onMouseDown={(e) => e.preventDefault()}
                    ref={(node) => (this.menuRef = node)}
                >
                    <SubHeader marginBottom={"1rem"}>
                        {"Search for repositories..."}
                    </SubHeader>
                    <MenuItems>
                        {isSearching ? (
                            <LoaderContainer>
                                <Loader />
                            </LoaderContainer>
                        ) : (
                            renderRepositories()
                        )}
                    </MenuItems>
                </SearchbarMenu>
            </>
        );
    };

    handleOutsideClick = (e) => {
        if (this.menuRef && !this.menuRef.contains(e.target)) {
            e.stopPropagation();

            e.preventDefault();

            this.inputRef.blur();

            this.setState({ isMenuOpen: false });
        }
    };

    handleOnChange = (e) => {
        const { searchTimeout, search } = this.props;

        const { isSearching } = this.state;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (!isSearching) {
            this.setState({
                isSearching: true,
            });
        }

        this.setState({
            searchTimeout: setTimeout(async () => {
                await search(e.target.value);

                this.setState({
                    isSearching: false,
                });
            }, 1000),
        });
    };

    handleOnFocus = async (e) => {
        const { search } = this.props;

        this.setState({ isMenuOpen: true });

        await search(e.target.value);

        this.setState({ isSearching: false });
    };

    renderContent = () => {
        const { isMenuOpen } = this.state;

        return (
            <SearchbarContainer>
                <SearchbarIconContainer>
                    <FiSearch />
                </SearchbarIconContainer>
                <SearchbarInput
                    ref={(node) => (this.inputRef = node)}
                    onFocus={(e) => this.handleOnFocus(e)}
                    onChange={(e) => {
                        this.handleOnChange(e);
                    }}
                    placeholder={"Search for any public repository..."}
                />
                {isMenuOpen && this.renderMenu()}
            </SearchbarContainer>
        );
    };

    render() {
        return this.renderContent();
    }
}

export default RepositorySearchMenu;

const SearchbarMenu = styled.div`
    position: absolute;

    width: 100%;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px 0px;

    border: 1px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    top: 4rem;

    border-radius: 1rem;

    padding: 1rem;

    z-index: 1;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};
`;

const MenuItems = styled.div`
    max-height: 26rem;

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

const SearchbarContainer = styled.div`
    height: 3.5rem;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    width: 100%;

    border-radius: 0.4rem;

    margin-top: 2rem;

    display: flex;

    align-items: center;

    padding: 0 1rem;

    position: relative;
`;

const SearchbarIconContainer = styled.div`
    display: flex;

    align-items: center;

    width: 2.5rem;

    font-size: 1.7rem;
`;

const SearchbarInput = styled.input`
    width: calc(100% - 2rem);

    height: 3.5rem;

    outline: none;

    font-weight: 500;

    font-size: 1.2rem;

    color: ${(props) => props.theme.TEXT_COLOR};

    border: none;

    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    &:focus {
        border: none;

        outline: none;
    }

    &::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;

        color: ${(props) => props.theme.TEXT_COLOR};

        font-weight: 500;

        opacity: 0.6;
    }

    display: flex;

    align-items: center;
`;

const LoaderContainer = styled.div`
    margin-bottom: 1.5rem;
`;
