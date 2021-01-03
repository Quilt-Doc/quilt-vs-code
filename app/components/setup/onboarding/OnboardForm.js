import React, { useMemo, useState, useEffect } from "react";

//components
import { Input, Button, Header, SubHeader } from "../../../elements";

//styles
import styled from "styled-components";

//redux
import { connect } from "react-redux";

//utility
import { validate } from "email-validator";

//actions
import { editUser } from "../../../actions/UserActions";

//react-router
import { withRouter } from "react-router-dom";

const OnboardForm = (props) => {
    const { user, editUser, location, history } = props;

    let inputRefs = {};

    const inputLabels = ["First Name", "Last Name", "Email Address"];

    const onboardUser = useMemo(
        () => async () => {
            const firstName = inputRefs[inputLabels[0]].value;

            const lastName = inputRefs[inputLabels[1]].value;

            const email = inputRefs[inputLabels[2]].value;

            if (!firstName) {
                console.log("UserMessage: Please enter a first name");

                return;
            }

            if (!lastName) {
                console.log("UserMessage: Please enter a last name");

                return;
            }

            if (!email) {
                console.log("UserMessage: Please enter an email address");

                return;
            }

            if (!validate(email)) {
                console.log("UserMessage: Invalid Email");

                return;
            }

            const { _id: userId } = user;

            await editUser({
                userId,
                firstName,
                lastName,
                email,
            });

            history.push("/onboard/create_workspace");
        },
        [inputLabels, inputRefs]
    );

    const renderForm = useMemo(
        () => () => {
            const inputs = inputLabels.map((label, i) => {
                return (
                    <Input
                        key={label}
                        label={label}
                        setRef={(node) => (inputRefs[label] = node)}
                        autoFocus={i === 0}
                        placeholder={label}
                    />
                );
            });

            return (
                <>
                    <Header>Welcome to Quilt.</Header>
                    <SubHeader>
                        Provide us some info so we can tailor your experience.
                    </SubHeader>
                    <Form>
                        {inputs}
                        <Button
                            onClick={() => {
                                onboardUser();
                            }}
                        >
                            Continue
                        </Button>
                    </Form>
                </>
            );
        },
        [onboardUser, inputRefs, inputLabels]
    );

    return renderForm();
};

const mapStateToProps = (state) => {
    const {
        auth: { user },
    } = state;
    return {
        user,
    };
};

export default withRouter(connect(mapStateToProps, { editUser })(OnboardForm));

const Form = styled.div`
    display: flex;

    flex-direction: column;
`;
