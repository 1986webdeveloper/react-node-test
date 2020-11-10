import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import { UserContextProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPasswordPage from './screens/ForgotPasswordPage';
import ResetPasswordPage from './screens/ResetPasswordPage';
import Dashboard from './screens/Dashboard';


const App = () => {
  return (
    <UserContextProvider>
      <Router >
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/forgot">
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset/:token/:email">
            <ResetPasswordPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
};

export default App;
