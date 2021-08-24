import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ws from '../util/connection'

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
    textTransform: "uppercase"
  },

  connectBtn: {
    margin: "2em auto",
    fontWeight: "bold",
    fontSize: "1.5em",
    borderRadius: "0.5em",
    width: "38%",
    minWidth:"8em",
    color: "green",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  disconnectBtn: {
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    "&:hover": {
      color: "#EEEDE9",
      backgroundColor: "#EAA410",
      
    },
  },
  disconnected: {
    color: "#fff",
    backgroundColor: "#FFA500",
  },
  error : {
    color:'red'
  },
  running: {
    color:'#FFA500'
  }
}));

function Timer({time}) {
  const classes = useStyles();
  // const [remaining, setRemaining] = useState(10);
  const minute = time / 60;
  const second = time % 60;
  const format = (second) => `${parseInt(second / 10)}${parseInt(second % 10)}`;
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setRemaining((r) => r && r - 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Typography variant="h4" className={classes.status}>
      {`${format(minute)}:${format(second)}`}
    </Typography>
  );
}

export const HomeTab = (props) => {
  const { wsOpen , systemID , readerStatus, measurement } = props;
  const classes = useStyles();
  
  if (!props.open) {
    return null
    }
  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="subtitle2" className={classes.preReaderId}>
        Reader ID
      </Typography>
      <Typography variant="h3" className={wsOpen? classes.readerId : clsx(classes.readerId,classes.disconnected)}>
        {systemID}
      </Typography>
      <Typography variant="subtitle2" className={classes.preStatus}>
        Reader Status
      </Typography>
      <Typography variant="h4" className={wsOpen?clsx(classes.status, classes[readerStatus.reader]): classes.running}>
        {wsOpen ? readerStatus.reader || '??' : 'Disconnected'}
      </Typography>
      { readerStatus.reader === 'running' &&
        <>
        <Typography variant="subtitle2" className={classes.preStatus}>
        Remaining Time
      </Typography>
      <Timer time = {measurement.remainingTime}/>
      </>
      }

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

    </Paper>
  );
};

const mapStateToProps = (state) => ({  
  wsOpen: state.data.wsOpen,
  systemID: state.data.systemID,
  readerStatus: state.data.readerStatus,
  measurement: state.data.readerStatus.measurement,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
