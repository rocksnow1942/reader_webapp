import React from "react";

import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { closeSnackAlert } from "../redux/actions/uiAction";

const getAutoHideDuration = (type, autoHideDuration) => {
  switch (type) {
    case "error":
      return autoHideDuration || 30000;
    case "info":
      return autoHideDuration || 5000;
    case "success":
      return autoHideDuration || 3000;
    case "warning":
      return autoHideDuration || 10000;
    default:
      return autoHideDuration || 5000;
  }
};

export const SnackBarAlert = ({ snackbar, closeSnackAlert }) => {
  const handleClose = (id, reason, onClose) => {    
    if (onClose) onClose();
    closeSnackAlert(id);
  };
  if (snackbar.length === 0) return null;

  return snackbar.map(
    ({ id, message, type, autoHideDuration, onClose }, idx) => (
      <Snackbar
        open={true}
        autoHideDuration={getAutoHideDuration(type, autoHideDuration)}
        onClose={(event, reason) => {
          handleClose(id, reason, onClose);
        }}
        style={{
          bottom: 80 + (idx) * 55 + "px",
        }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        // disableWindowBlurListener
        ClickAwayListenerProps={{
          mouseEvent: false,
          touchEvent: false,
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            handleClose(id, "close", onClose);
          }}
          severity={type || "success"}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    )
  );
};

const mapStateToProps = (state) => ({
  snackbar: state.ui.snackbar,
});

const mapDispatchToProps = {
  closeSnackAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarAlert);
