import { Box, Grid, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as modalActions from "../../actions/modal";
import { reduxForm, Field } from "redux-form";
import renderTextField from "./../../components/FormHelper/TextField/index";
import renderSelectField from "./../../components/FormHelper/Select/index";

import myValidation from "./myValidation";
import * as taskActions from "./../../actions/taskAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class TaskForm extends Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreater, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionsCreater;
    const { title, description, status } = data;
    
    if (taskEditing && taskEditing._id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
  };

  required = (value) => {
    let error = "Required";
    if (value !== null && typeof value !== "undefined" && value.trim() !== "") {
      error = null;
    }
    return error;
  };

  renderStatusSelection() {
    const { taskEditing, classes } = this.props;
    let xhtml = null;
    
    if (taskEditing && taskEditing._id) {
      xhtml = (
        <Field
          id="status"
          name="status"
          component={renderSelectField}
          label="Status"
          className={classes.selectStatus}
        >
          <MenuItem value={0}>READY</MenuItem>
          <MenuItem value={1}>IN PROGRESS</MenuItem>
          <MenuItem value={2}>COMPLETED</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

  render() {
    const {
      classes,
      modalActionsCreater,
      handleSubmit,
      invalid,
      submitting,
      taskEditing,
    } = this.props;
    const { hideModal } = modalActionsCreater;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container spacing={8}>
          <Grid item md={8}>
            <Field
              id="title"
              name="title"
              component={renderTextField}
              label="Title"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={8}>
            <Field
              id="description"
              name="description"
              component={renderTextField}
              label="Description"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={8}>
            {this.renderStatusSelection()}
          </Grid>

          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse">
              <Box ml={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={invalid || submitting}
                >
                  Save
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={hideModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskForm.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  modalActionsCreater: PropTypes.shape({
    hideModal: PropTypes.function,
  }),
  taskActionsCreater: PropTypes.shape({
    addTask: PropTypes.function,
    updateTask: PropTypes.function,
  }),
  taskEditing: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: state.task.taskEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    modalActionsCreater: bindActionCreators(modalActions, dispatch),
    taskActionsCreater: bindActionCreators(taskActions, dispatch),
  };
};
const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate: myValidation,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
