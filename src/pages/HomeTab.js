import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.customSpacings.innerWidth,
    margin: "auto",
    height: theme.customSpacings.innerHeight,
    backgroundColor: theme.palette.background.paper,
    top: theme.customSpacings.innerPosition.top,
    borderRadius: theme.shape.innerBorderRadius,
    position: "relative",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  preReaderId: {
    color: theme.palette.text.secondary,
    fontSize: "1.5rem",
    margin: "50px 0px 10px 0px",
  },
  readerId: {
    backgroundColor: "green",
    padding: "15px 25px",
    borderRadius: "1em",
    color: "white",
    fontWeight: "bold",
  },
  preStatus: {
    marginTop: "20px",
    color: theme.palette.text.secondary,
  },
  status: {
    color: "green",
    fontWeight: "bold",
  },

  connectBtn: {
    margin: "2em auto",
    fontWeight: "bold",
    fontSize: "1.5em",
    borderRadius: "0.5em",
    width: "30%",
    color: "green",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  disconnectBtn: {
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#EEB422",
    },
  },
  disconnected: {
    color: "#fff",
    backgroundColor: "#FFA500",
  },
}));

function Timer() {
  const classes = useStyles();
  const [remaining, setRemaining] = useState(10);
  const minute = remaining / 60;
  const second = remaining % 60;
  const format = (second) => `${parseInt(second / 10)}${parseInt(second % 10)}`;
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((r) => r && r - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Typography variant="h4" className={classes.status}>
      {`${format(minute)}:${format(second)}`}
    </Typography>
  );
}

export const HomeTab = (props) => {
  const { ws, wsOpen } = props;
  const classes = useStyles();
  const [connected, setConnected] = useState(false);

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="subtitle2" className={classes.preReaderId}>
        Reader ID
      </Typography>
      <Typography variant="h3" className={wsOpen? classes.readerId : clsx(classes.readerId,classes.disconnected)}>
        AMS-PGH
      </Typography>
      <Typography variant="subtitle2" className={classes.preStatus}>
        Reader Status
      </Typography>
      <Typography variant="h4" className={classes.status}>
        Running
      </Typography>
      <Typography variant="subtitle2" className={classes.preStatus}>
        Remaining Time
      </Typography>
      <Timer></Timer>

      <Button
        className={
          wsOpen
            ? classes.connectBtn
            : clsx(
                classes.connectBtn,
                classes.disconnected,
                classes.disconnectBtn
              )
        }
        onClick={() => {
          wsOpen ?(
            process.env.NODE_ENV==='development' && ws.close() 
          ): ws.connect();
        }}
      >
        {" "}
        {wsOpen ? "Connected" : "Connect"}
      </Button>

      <Button
        onClick={() => {
          props.ws.send({ action: "main.getVersion" });
        }}
      >
        Test Button
      </Button>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  ws: state.ws,
  wsOpen: state.wsOpen,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
