import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as authActions from "./../../actions/auth";
import { withRouter, Link } from "react-router-dom";
import callApi from "./../../apis/apiCaller.js";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: false,
    };
  }
  // componentDidMount(){
  //   const cookies = new Cookies();
  //   const cookie = cookies.get("refreshToken");
  //   if (cookie) {
  //    this.setSta();

  //   }
  // }
  // setSta(){
  //    this.setState({
  //       isLogin:!this.state.isLogin
  //     })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.isLogin !== this.state.isLogin) {
  //     console.log("login",this.props.isLogin);
  //     console.log(prevProps.isLogin);

  //   }
  //   //
  //   // }
  // }

  handleSumbit = (event) => {
    const { authActionsCreater } = this.props;
    const { loginSuccess, loginFail } = authActionsCreater;
    event.preventDefault();
    let { username, password } = this.state;
    //
    callApi("/user/login", "POST", { username, password })
      .then((res) => {
        if (res) {
          callApi("/user", "POST", { username, password }).then((res) => {
            const { data } = res;
            const { accessToken, refreshToken } = data;
            const cookies = new Cookies();
            cookies.set("payloadClient", accessToken, { maxAge: 60 });
            cookies.set("refreshToken", refreshToken, { maxAge: 72000 });
            loginSuccess(username, password);
            this.props.history.push("/admin/task-board");
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          return loginFail(err.response.data);
        } else if (err) {
          return loginFail(err);
        }
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => (this.state.username = e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => (this.state.password = e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSumbit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
LoginPage.propTypes = {
  classes: PropTypes.object,
  userInf: PropTypes.object,
  handleSumbit: PropTypes.func,
  authActionsCreater: PropTypes.shape({
    hideModal: PropTypes.function,
  }),
  taskActionsCreater: PropTypes.shape({
    loginSuccess: PropTypes.function,
    loginFail: PropTypes.function,
  }),
  isLogin: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    userInf: state.auth.userInf,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    authActionsCreater: bindActionCreators(authActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const LoginPageWithRouter = withRouter(LoginPage);
export default compose(withStyles(styles), withConnect)(withRouter(LoginPage));
