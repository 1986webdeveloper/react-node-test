import React from 'react';
import { withRouter } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useUsersState } from '../contexts/UserContext';
import { useUserDispatch } from '../contexts/UserContext';
import "./login.css";

const Dashboard = (props: any) => {
    const user = useUsersState();
    const dispatch = useUserDispatch();

    if (user.token === "") {
        props.history.push("/");
    }

    const onLogout = () => {
        dispatch({
            type: 'CLEAR_DATA'
        });
        props.history.push("/");
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md={4}>
                    <h2>Welcome {user.name}</h2>
                    <Button variant="primary" onClick={onLogout}>Logout</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Dashboard);