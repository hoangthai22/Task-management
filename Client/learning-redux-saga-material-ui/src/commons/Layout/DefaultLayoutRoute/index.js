import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Route } from "react-router-dom";
import Dashboard from "./../../../components/Dashboard";
import PropTypes from "prop-types";
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createBrowserHistory from "./../../history";
import Cookies from "universal-cookie";

class DefaultLayoutRoute extends Component {
  // componentDidMount() {
  //   const cookies = new Cookies();
  //   const cookie = cookies.get("refreshToken");
  //   if (cookie) {
  //     let { isLogin } = this.props;
  //     isLogin = true;
  //   }
  // }
  render() {
    const { component: YourComponent, ...remainProps } = this.props;
    return (
      <Route
        history={createBrowserHistory}
        {...remainProps}
        render={(routeProps) => {
          return <YourComponent {...routeProps} />;
        }}
      />
    );
  }
}
DefaultLayoutRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  path: PropTypes.string,
  name: PropTypes.string,
};

export default DefaultLayoutRoute;
