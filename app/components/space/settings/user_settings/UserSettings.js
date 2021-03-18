import React, { Component } from "react";

//styles
import styled from "styled-components";

//actions
import { editUser } from "../../../../actions/UserActions";

//components
import {
    Panel,
    Header,
    WrappedSubHeader,
    Input,
    Button,
} from "../../../../elements";

//redux
import { connect } from "react-redux";

class UserSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updating: false,
        };
    }

    renderInputs = () => {
        const {
            user: { firstName, lastName, email, organization, position },
        } = this.props;

        const inputs = [
            {
                label: "First Name",
                inputName: "firstNameInput",
                defaultValue: firstName,
            },
            {
                label: "Last Name",
                inputName: "lastNameInput",
                defaultValue: lastName,
            },
            {
                label: "Email Address",
                inputName: "emailInput",
                defaultValue: email,
            },
            {
                label: "Organization",
                inputName: "orgInput",
                defaultValue: organization,
            },
            {
                label: "Position",
                inputName: "positionInput",
                defaultValue: position,
            },
        ];

        return inputs.map((input) => {
            const { label, inputName, defaultValue } = input;

            return (
                <Input
                    key={label}
                    label={label}
                    setRef={(node) => (this[inputName] = node)}
                    spellCheck={false}
                    autoFocus={false}
                    defaultValue={defaultValue}
                    placeholder={`Enter ${label}`}
                />
            );
        });
    };

    updateUserSettings = async () => {
        const { editUser, user } = this.props;

        const formValues = {
            userId: user._id,
        };

        const possValues = {
            firstName: this.firstNameInput.value,
            lastName: this.lastNameInput.value,
            position: this.positionInput.value,
            email: this.emailInput.value,
            organization: this.orgInput.value,
        };

        Object.keys(possValues).map((key) => {
            if (user[key] != possValues[key]) {
                formValues[key] = possValues[key];
            }
        });

        if (
            "email" in formValues &&
            !EmailValidator.validate(formValues["email"])
        ) {
            //alert("Invalid Email");

            return;
        }

        this.setState({ updating: true });

        await editUser(formValues);

        this.setState({ updating: false });

        return;
    };

    render() {
        const { updating } = this.state;

        return (
            <PanelContainer>
                <Header>User Profile</Header>
                <WrappedSubHeader>
                    Change your profile information.
                </WrappedSubHeader>
                {this.renderInputs()}
                <Button loading={updating} onClick={this.updateUserSettings}>
                    Update
                </Button>
            </PanelContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        auth: { user },
    } = state;

    return {
        user,
    };
};

export default connect(mapStateToProps, { editUser })(UserSettings);

const PanelContainer = styled(Panel)`
    margin-top: 1.5rem;

    padding: 2rem 2rem;

    display: flex;

    flex-direction: column;
`;

const PanelHeader = styled(Header)`
    margin-bottom: 1.2rem;
`;
