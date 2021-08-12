import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import Dashboard from "./../../../components/Dashboard";
import PropTypes from "prop-types";
import { Router } from "react-router-dom";
import createBrowserHistory from "./../../history";
import Cookies from "universal-cookie";
import LoginPage from "../../../containers/LoginPage";

class AdminLayoutRoute extends Component {

  render() {
    const { component: YourComponent, ...remainProps } = this.props;
    return (
      <Route
        history={createBrowserHistory}
        {...remainProps}
        render={(routeProps) => {
          return (
            <Dashboard {...remainProps}>
              <YourComponent {...routeProps} />
            </Dashboard>
          );
        }}
      />
    );
  }
}

AdminLayoutRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  path: PropTypes.string,
  name: PropTypes.string,
  componentIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default AdminLayoutRoute;
