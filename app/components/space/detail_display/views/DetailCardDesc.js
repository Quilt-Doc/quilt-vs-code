import React, { Component } from "react";
import PropTypes from "prop-types";

// components
import Markdown from "markdown-to-jsx";
import { SubHeader } from "../../../../elements";

//styles
import styled from "styled-components";

class DetailCardDesc extends Component {
    renderDescription = () => {
        let {
            elem: { name, description },
            kind,
        } = this.props;

        const descriptionKinds = new Set(["pullRequest", "commit", "ticket"]);

        if (descriptionKinds.has(kind)) {
            if (kind == "commit") {
                description = name.split("\n").slice(1).join("\n");
            }

            if (!description || description.length == 0) {
                description = (
                    <div>
                        <DetailDesc>
                            <PlaceholderText>
                                <Markdown>
                                    There is no description available yet..
                                </Markdown>
                            </PlaceholderText>
                        </DetailDesc>
                    </div>
                );
            } else {
                description = (
                    <div>
                        <DetailDesc>
                            <OpaqueSubHeader>
                                <Markdown>{description}</Markdown>;
                            </OpaqueSubHeader>
                        </DetailDesc>
                    </div>
                );
            }

            return <DetailCardDescContent>{description}</DetailCardDescContent>;
        }
    };

    render() {
        return this.renderDescription();
    }
}

export default DetailCardDesc;

DetailCardDesc.propTypes = {
    elem: PropTypes.object,
    kind: PropTypes.string,
};

const OpaqueSubHeader = styled(SubHeader)`
    opacity: 1;

    margin-left: ${(props) => props.marginLeft};

    margin-bottom: ${(props) => props.marginBottom};
`;

const PlaceholderText = styled(SubHeader)`
    opacity: 0.9;

    font-style: italic;
`;

const DetailCardDescContent = styled.div`
    margin-bottom: 1.5rem;

    display: flex;

    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    border-radius: 0.6rem;

    box-shadow: ${(props) => props.theme.BOX_SHADOW_1};
`;

const DetailDesc = styled.div`
    background-color: ${(props) => props.theme.PRIMARY_ACCENT_COLOR_SHADE_1};

    padding: 1.5rem;

    border-radius: 0.6rem;
`;
