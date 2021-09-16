import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import ConfirmDialog from "./ConfirmDialog";

import { closeSnackAlert } from "../redux/actions/uiAction";

export const SnackBarAlert = ({ snackbar, closeSnackAlert }) => {
  const handleClose = (id, reason, onClose) => {
    if (reason === "clickaway") {
      return;
    }
    if (onClose) onClose();
    closeSnackAlert(id);
  };
  if (snackbar.length === 0) return null;

  return snackbar.map(({ id, message, type, autoHideDuration, onClose }) => (
    <Snackbar
      open={true}
      autoHideDuration={1000}
      onClose={(event, reason) => {
        if (reason === "timeout") {
        } else {
          setOpen(false);
        }
      }}
      className={classes.snackbar}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      // disableWindowBlurListener
      ClickAwayListenerProps={{
        // onClickAway: () => {}
        mouseEvent: false,
        touchEvent: false,
      }}
    >      
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={(e,rea) => {
          
        }}
        severity={type||'success'}
      >
        This is a success message!
      </MuiAlert>
    </Snackbar>
  ));
};

SnackBarAlert.propTypes = {
  props: PropTypes,
};

const mapStateToProps = (state) => ({
  snackbar: state.UI.snackbar,
});

const mapDispatchToProps = {
  closeSnackAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarAlert);
