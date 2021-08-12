import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTES } from "../../../constants/index";
import styles from "./styles";

class SideBar extends Component {
  toggleDrawer = (value) => {
    const { onToggleSideBar } = this.props;
    if (onToggleSideBar) {
      onToggleSideBar(true);
    }
  };

  renderList() {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="nav">
          {ADMIN_ROUTES.map((item) => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
              >
                <ListItem key={item.path} className={classes.listItem} button>
                  <ListItemIcon>
                  {item.componentIcon}
                  </ListItemIcon>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );

    return xhtml;
  }

  render() {
    const { classes, showSideBar } = this.props;
    return (
      <Drawer
        open={showSideBar}
        onClose={() => this.toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
      >
        {this.renderList()}
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object,
  showSideBar: PropTypes.bool,
  onToggleSideBar: PropTypes.func,
};
export default withStyles(styles)(SideBar);
