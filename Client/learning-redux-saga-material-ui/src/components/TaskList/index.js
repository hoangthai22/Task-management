import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import TaskItem from "../TaskItem";
import PropTypes from "prop-types";

class TaskList extends Component {
  render() {
    const { classes, tasks, status,  onClickEdit, onClickDelete} = this.props;
    return (
      <Grid item md={4} key={status.value}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <Paper>
          {tasks.map((task, index) => {
            return <TaskItem task={task} status={status} key={index} onClickDelete={() => onClickDelete(task)} onClickEdit={() => onClickEdit(task)}/>;
          })}
        </Paper>
      </Grid>
    );
  }
}
TaskList.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  status: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete:PropTypes.func,
}
export default withStyles(styles)(TaskList);
