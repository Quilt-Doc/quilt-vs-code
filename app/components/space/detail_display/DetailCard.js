import React, { Component } from "react";
import PropTypes from "prop-types";

//styles
import styled from "styled-components";

//components
import DetailCardNav from "./views/DetailCardNav";
import DetailCardStatus from "./views/DetailCardStatus";
import DetailCardTags from "./views/DetailCardTags";
import DetailCardDesc from "./views/DetailCardDesc";

//TODO: Need to set max lengths on everything

class DetailCard extends Component {
    handleOutsideClick = (e) => {
        if (this.menuRef && !this.menuRef.contains(e.target)) {
            e.stopPropagation();

            e.preventDefault();

            const { closeCard } = this.props;

            closeCard();
        }
    };

    render() {
        const { isOpen, kind, elem } = this.props;

        return (
            <>
                {isOpen && (
                    <>
                        <MenuBackground onMouseDown={this.handleOutsideClick} />
                        <DetailCardContainer ref={(node) => (this.menuRef = node)}>
                            <DetailCardNav kind={kind} elem={elem} />
                            <Divider />
                            <DetailCardStatus kind={kind} elem={elem} />
                            <DetailCardTags kind={kind} elem={elem} />
                            <DetailCardDesc kind={kind} elem={elem} />
                        </DetailCardContainer>
                    </>
                )}
            </>
        );
    }
}

// under review between tags and description
/* #F85149
- **Directly Linked Issues?**
- **Review Status**
- **Labels**
- **Number of Commits**
- **Number of Comments**
- **Number of Files**
- Number of Associated Elements
- **Branches Involved**
*/

// hover to see expand and link to
// branches
// description
// github repository

//colored icons

export default DetailCard;

DetailCard.propTypes = {
    kind: PropTypes.string,
    elem: PropTypes.object,
    closeCard: PropTypes.func,
    isOpen: PropTypes.bool,
};

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

const Divider = styled.div`
    margin-top: 1.3rem;

    margin-bottom: 1.3rem;

    margin-left: 2.8rem;

    border-bottom: 2px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};
`;

const DetailCardContainer = styled.div`
    cursor: default;

    position: absolute;

    width: 40rem;

    max-width: calc(100vw-5rem);

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR};

    box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px 0px;

    border: 1px solid ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    top: 3.5rem;

    z-index: 1;

    border-radius: 1rem;

    display: flex;

    flex-direction: column;

    padding: 2rem 2.2rem;

    padding-bottom: 1.5rem;
`;

/*        const blameColors = [
            "rgb(93,106,210)",
            "rgb(77,183,130)",
            "rgb(195,119,224)",
            "rgb(197,41,40)",
            "rgb(37,181,206)",
            "rgb(235,87,87)",
            "rgb(242,201,75)",
            "rgb(255,120,203)",
            "rgb(235,90,71)",
        ];
        

*/
