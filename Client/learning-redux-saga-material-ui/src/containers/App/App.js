import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import AdminLayoutRoute from "../../commons/Layout/AdminLayoutRoute";
import DefaultLayoutRoute from "../../commons/Layout/DefaultLayoutRoute";
import theme from "../../commons/Theme";
import GlobalLoading from "../../components/GlobalLoading";
import { ADMIN_ROUTES, ROUTES } from "../../constants";
import configureStore from "../../redux/configureStore";
import createBrowserHistory from "./../../commons/history.js";
import ModalTask from "./../../components/Modal";
import styles from "./style";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

   componentWillMount() {
    const cookies = new Cookies();
    const cookie = cookies.get("refreshToken");
    if (cookie) {
     this.setSta();
     createBrowserHistory.push('/admin/task-board');
    }
  }

  setSta(){
     this.setState({
        isLogin:!this.state.isLogin
      })
  }
  renderAdminRoutes() {
    let xhtml = null;

    xhtml = ADMIN_ROUTES.map((route) => {
      return (
        <AdminLayoutRoute
          key={route.path}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
          componentIcon={route.componentIcon}
        />
      );
    });
    return xhtml;
  }

  renderDefaultRoutes() {
    let xhtml = null;

    xhtml = ROUTES.map((route) => {
      return (
        <DefaultLayoutRoute
          key={route.path}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
        />
      );
    });
    return xhtml;
  }

  // renderRoutes() {
  //   const isLogin = this.state.isLogin;
  //   if (isLogin) {
  //     return this.renderAdminRoutes();
  //   } else {
  //     return createBrowserHistory.push('/');
  //   }
  // }

  render() {
    const { classes } = this.props;
    console.log('this.state.isLogin', this.state.isLogin);
    return (
      <Provider store={store}>
        {/* Cấu hình component, khai báo route ở đây, nó như wrap bao bọc tất cả */}
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalLoading />
            <ToastContainer />
            <ModalTask />
            <Switch>
              {this.renderDefaultRoutes()}
              {this.state.isLogin ? (
                this.renderAdminRoutes()
              ) : (
                this.renderDefaultRoutes()
              )}
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
