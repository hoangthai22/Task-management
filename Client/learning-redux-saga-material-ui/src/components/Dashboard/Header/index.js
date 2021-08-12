import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Cookies from "universal-cookie";
import callApi from "../../../apis/apiCaller";
import { toastSuccess, toastError } from "../../../helpers/toastHelper";

const menuId = "primary-search-account-menu";
const DesktopMenuId = "primary-search-account-menu-mobile";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desktopMoreAnchorEl: null,
      mobileAnchorEl: null,
      username: "",
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const refreshToken = cookies.get("refreshToken");
    callApi(`user/${refreshToken}`, "GET", { token: refreshToken })
      .then((res) => {
        this.setState({
          username: res.data.username,
        });
      })
      .catch((err) => {
        toastError({message: 'Please log in again'});
      });
  }
  //Desktop
  handleDesktopOpen = (event) => {
    this.setState({
      desktopMoreAnchorEl: event.currentTarget,
    });
  };

  handleDesktopMenuClose = () => {
    this.setState({
      desktopMoreAnchorEl: null,
    });
  };

  //Mobile
  handleMobileMenuClose = () => {
    this.setState({
      mobileAnchorEl: null,
    });
  };

  handleDesktopMenuOpen = (event) => {
    this.setState({
      mobileAnchorEl: event.currentTarget,
    });
  };

  renderMenu = () => {
    const { mobileAnchorEl } = this.state;
    const isMenuOpen = Boolean(mobileAnchorEl);
    return (
      <Menu
        anchorEl={mobileAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>My account</MenuItem>
      </Menu>
    );
  };

  handleLogout = () => {
    const { history } = this.props;
    const cookies = new Cookies();
    const refreshToken = cookies.get("refreshToken");
    callApi("/user/logout", "POST", { token: refreshToken })
      .then((res) => {
        cookies.remove("refreshToken");
        if (history) {
          history.push("/");
        }
        toastSuccess("Logout successful");
      })
      .catch((err) => console.log(err));
  };
  renderDesktopMenu = () => {
    const { desktopMoreAnchorEl } = this.state;
    const isDesktopMenuOpen = Boolean(desktopMoreAnchorEl);

    return (
      <Menu
        anchorEl={desktopMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={DesktopMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isDesktopMenuOpen}
        onClose={this.handleDesktopMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleDesktopOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleLogout}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    );
  };

  handleToggleSideBar = () => {
    const { showSideBar, onToggleSideBar } = this.props;

    if (onToggleSideBar) {
      onToggleSideBar(!showSideBar);
    }
  };

  render() {
    const { classes, name } = this.props;

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleToggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {name}
            </Typography>
          
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleDesktopOpen}
                color="inherit"
              >
                <AccountCircle />
                <Typography className="" variant="h6" noWrap>
                  {this.state.username}
                </Typography>
              </IconButton>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={DesktopMenuId}
                aria-haspopup="true"
                onClick={this.handleDesktopMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderDesktopMenu()}
        {this.renderMenu()}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  showSideBar: PropTypes.bool,
  onToggleSideBar: PropTypes.func,
};

export default withStyles(styles)(withRouter(Header));
