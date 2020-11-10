import React, { useState } from 'react';
import {
    NavLink,
    withRouter
} from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { postData } from "../contexts/utils";
import "./login.css";

const ForgotPasswordPage = (props: any) => {
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [email_id, setEmailId] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const form: any = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            var data = { email_id };
            postData("/api/user/forgot", data).then(result => {
                if (result.status) {
                    setAlertType("success");
                    setAlertMessage(result.message);
                    props.history.push(`/reset/${result.token}/${email_id}`);
                }
                else {
                    setAlertType("danger");
                    setAlertMessage(result.message);
                }
            })
        }

        setValidated(true);
    };


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md={4}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-box">
                        <Alert variant={alertType}>
                            {alertMessage}
                        </Alert>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmailId(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">Reset Password</Button>
                        <hr />
                        <NavLink to="/login">Already have a password ?</NavLink>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(ForgotPasswordPage);
