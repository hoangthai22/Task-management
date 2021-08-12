import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as modalActions from "../../actions/modal";
import * as taskActions from "../../actions/taskAction";
import SearchBox from "../../components/SearchBox";
import TaskList from "../../components/TaskList";
import { STATUSES } from "../../constants";
import TaskForm from "../TaskForm";
import styles from "./styles";

class Taskboard extends Component {
  componentDidMount() {
    const { taskActionsCreater } = this.props;
    const { fetchListTask } = taskActionsCreater;
    fetchListTask();
  }

  handleEditTask = (task) => {
    const { taskActionsCreater, modalActionsCreater } = this.props;
    const { setTaskEditing } = taskActionsCreater;
    setTaskEditing(task);
    const { showModal, changeModalContent, changeModalTitle } =
      modalActionsCreater;
    showModal();
    changeModalTitle("Edit task");
    changeModalContent(<TaskForm />);
  };

  handleDeleteTask = (task) => {

    const { _id } = task;
    const { taskActionsCreater } = this.props;
    const { deleteTask } = taskActionsCreater;
    deleteTask(_id);
  };

  showModalDeleteTask = (task) => {
    const { modalActionsCreater, classes } = this.props;
    const { showModal, hideModal, changeModalContent, changeModalTitle } =
      modalActionsCreater;
    showModal();
    changeModalTitle("Delete task");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalDeleteConfirm}>
          Do you want to delete
          <span className={classes.modalConfirmTextBold}> {task.title}</span>
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={hideModal}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.handleDeleteTask(task)}
            >
              OK
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  renderBoard() {
    const { listTask } = this.props;
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={3}>
        {STATUSES.map((status) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              tasks={taskFiltered}
              status={status}
              key={status.value}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  openForm = () => {
    const { taskActionsCreater, modalActionsCreater } = this.props;
    const { setTaskEditing } = taskActionsCreater;
    setTaskEditing(null);
    const { showModal, changeModalContent, changeModalTitle } =
      modalActionsCreater;
    showModal();
    changeModalTitle("Insert new task");
    changeModalContent(<TaskForm />);
  };

  renderForm() {
    let xhtml = null;
    const { open } = this.state;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />;
    return xhtml;
  }

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionsCreater } = this.props;
    const { filterTask } = taskActionsCreater;
    filterTask(value);
  };

  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskboard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonInsert}
          onClick={this.openForm}
        >
          <AddIcon />
          Insert new task
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

Taskboard.propTypes = {
  classes: PropTypes.object,
  taskActionsCreater: PropTypes.shape({
    fetchListTask: PropTypes.func,
    deleteTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    filterTask: PropTypes.func,
  }),
  modalActionsCreater: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),

  listTask: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    taskActionsCreater: bindActionCreators(taskActions, dispatch),
    modalActionsCreater: bindActionCreators(modalActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
)(Taskboard);
