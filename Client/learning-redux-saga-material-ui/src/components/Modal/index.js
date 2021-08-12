import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from '../../actions/modal'
import { Modal } from "@material-ui/core";


class ModalTask extends Component {
  render() {
    const { open, onClose, classes, component, modalActionsCreater, title } = this.props;
    const {hideModal} = modalActionsCreater;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.titleModel}>{title}</span>
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}
ModalTask.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  onClose: PropTypes.func,
  conponent:PropTypes.object,
  title:PropTypes.string,
  modalActionsCreater: PropTypes.shape({
    hideModal:PropTypes.func
  })
};

const mapStateToProps = (state) => {
  return {
     open: state.modal.showModal,
     component: state.modal.component,
     title: state.modal.title
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    modalActionsCreater: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ModalTask)
);
