import React, { Component } from "react";
import { mergeClasses, withStyles } from "@material-ui/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import SideBar from "./SideBar";
import Header from "./Header";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uiActions from "./../../actions/ui";
import cn from "classnames";

class Dashboard extends Component {
  handleToggleSideBar = (value) => {
    const { uiActionCreator } = this.props;
    const { showSideBar, hideSideBar } = uiActionCreator;
    if (value === true) {
      showSideBar();
    } else {
      hideSideBar();
    }
  };

  render() {
    const { children, classes, name, showSideBar, componentIcon } = this.props;
    return (
      <div className={classes.dashBoard}>
        <Header
          name={name}
          showSideBar={showSideBar}
          onToggleSideBar={this.handleToggleSideBar}
        />
        <div className={classes.wrapper}>
          <SideBar
            showSideBar={showSideBar}
            onToggleSideBar={this.handleToggleSideBar}
          />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: showSideBar === false,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  uiActionCreator: PropTypes.shape({
    showSideBar: PropTypes.func,
    hideSideBar: PropTypes.func,
  }),
  showSideBar: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showSideBar: state.ui.showSideBar,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    uiActionCreator: bindActionCreators(uiActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(Dashboard);
