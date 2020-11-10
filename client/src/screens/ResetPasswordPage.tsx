import React, { useState } from 'react';
import {
    NavLink,
    withRouter
} from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { postData } from "../contexts/utils";
import "./login.css";



const ResetPasswordPage = (props: any) => {
    const { email, token } = props.match.params;
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [new_password, setPassword] = useState('');
    const [confirm_password, setCPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const form: any = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            if (new_password === confirm_password) {
                var data = { password: new_password, email_id: email, token };
                postData("/api/user/reset", data).then(result => {
                    if (result.status) {
                        setAlertType("success");
                        setAlertMessage(result.message);
                        setInterval(() => {
                            props.history.push(`/login`);
                        }, 3000);
                    }
                    else {
                        setAlertType("danger");
                        setAlertMessage(result.message);
                    }
                })
            }
            else {
                setAlertType("danger");
                setAlertMessage("Both password is not match!");
            }
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
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" onChange={e => setCPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">Update</Button>
                        <hr />
                        <NavLink to="/login">Already have a password ?</NavLink>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(ResetPasswordPage);
