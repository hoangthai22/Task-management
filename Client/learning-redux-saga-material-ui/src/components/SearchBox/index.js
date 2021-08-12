import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form classes={classes.container} noValidate autoComplete="off">
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          className={classes.textField}
          onChange={handleChange}
        />
      </form>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func
};

export default withStyles(styles)(SearchBox);
