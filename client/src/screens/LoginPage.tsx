import React, { useState } from 'react';
import {
    NavLink, withRouter
} from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useUserDispatch } from '../contexts/UserContext';
import { postData } from "../contexts/utils";
import "./login.css";

const LoginPage = (props: any) => {
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [email_id, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useUserDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const form: any = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            var data = { email_id, password };
            postData("/api/user/login", data).then(result => {
                if (result.status) {
                    setAlertType("success");
                    setAlertMessage("Login successfull!");
                    dispatch({
                        type: 'LOGIN',
                        data: { token: result.token, name: result.name }
                    });
                    props.history.push("/dashboard");
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

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">Login</Button> | <NavLink to="/forgot">forgot password ?</NavLink>
                        <hr />
                        <NavLink to="/register">Create new account ?</NavLink>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(LoginPage);