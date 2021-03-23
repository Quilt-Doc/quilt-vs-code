import React, { Component } from "react";

import {
    Header,
    WrappedSubHeader,
    Step,
    Input,
    Button,
    ExternalLink,
} from "../../../../../../../elements";

//styles
import styled from "styled-components";

//react-redux
import { connect } from "react-redux";

//actions
import { createJiraAccessToken } from "../../../../../../../actions/JiraActions";

//router
import { withRouter } from "react-router-dom";

class IntegrationRequestInformation extends Component {
    constructor(props) {
        super(props);
    }

    renderLinkStep = () => {
        const link =
            "https://id.atlassian.com/manage-profile/security/api-tokens";

        const step = (
            <WrappedSubHeader>
                {"Navigate to the following: "}
                <ExternalLink text={link} link={link} />
            </WrappedSubHeader>
        );

        return <Step number={1} detail={step} marginTop={"1.5rem"} />;
    };

    renderSteps = () => {
        let steps = [
            'Select "Create API Token".',
            'Choose a clear label, e.g. "Quilt Token".',
            'Click "Create".',
            "Copy your API Token into the input field below.",
            'Enter you Jira email address and click "Continue".',
        ];

        steps = steps.map((step) => {
            return <WrappedSubHeader>{step}</WrappedSubHeader>;
        });

        const secondarySteps = steps.map((step, i) => {
            return (
                <Step
                    key={i + 2}
                    number={i + 2}
                    detail={step}
                    marginTop={"1.5rem"}
                />
            );
        });

        return (
            <>
                {this.renderLinkStep()}
                {secondarySteps}
            </>
        );
    };

    handleClick = async () => {
        const { createJiraAccessToken, match } = this.props;

        const { workspaceId } = match.params;

        const result = await createJiraAccessToken({
            tokenValue: this.tokenInput.value,
            emailAddress: this.emailInput.value,
            workspaceId,
        });

        const { setLoaded } = this.props;

        setLoaded();
    };

    render() {
        return (
            <>
                <Header>Provide Jira Personal Access Token</Header>
                <WrappedSubHeader>
                    {
                        "Quilt uses this token to extract development information ( linked commits, PRs, etc ) from Jira Issues and improve association accuracy."
                    }
                </WrappedSubHeader>
                <Directions>{this.renderSteps()}</Directions>
                <Input
                    label={"Personal Access Token"}
                    setRef={(node) => (this.tokenInput = node)}
                    spellCheck={false}
                    autoFocus={false}
                    placeholder={`Personal Access Token`}
                    marginTop={"2rem"}
                />
                <Input
                    label={"Email"}
                    setRef={(node) => (this.emailInput = node)}
                    spellCheck={false}
                    autoFocus={false}
                    placeholder={`Email`}
                    marginTop={"2rem"}
                />
                <Button onClick={this.handleClick}>Continue</Button>
            </>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, { createJiraAccessToken })(
        IntegrationRequestInformation
    )
);

const Directions = styled.div`
    margin-top: 1.7rem;
`;
