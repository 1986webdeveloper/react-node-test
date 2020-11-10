import React, { useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useUserDispatch } from '../contexts/UserContext';
import { postData } from "../contexts/utils";
import "./login.css";

const RegisterPage = (props: any) => {
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [name, setName] = useState('');
    const [email_id, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useUserDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const form: any = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            var data = { name, email_id, password };
            postData("/api/user/register", data).then(result => {
                if (result.status) {
                    setAlertType("success");
                    setAlertMessage("Register successfull!");
                    dispatch({
                        type: 'REGISTER',
                        data: { token: result.token, name: result.name }
                    });

                    //props.history.push("/dashboard");
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

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmailId(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">Register</Button>
                        <hr />
                        <NavLink to="/login">Already have a account ?</NavLink>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}


export default withRouter(RegisterPage);