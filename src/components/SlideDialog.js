import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({ 
  paper:{
    borderRadius: "5px",
  },

  container: {
    backgroundColor: theme.palette.background.outerSpace,
    width: "calc(100vw - 2px)",    
    maxWidth: "600px",
    margin: "10em auto 0px auto",    
    borderRadius: `5px`,    
    maxHeight:'90%',    
    position:'absolute',
    bottom:'1px',
    left:'max(1px, calc(50vw - 300px))'
}}));

/**
 * render the slide dialog title
 * @param {{title:string,handleClose:Function}} props
 * @returns 
 */
export const SlideDialogTitle = ({ title, handleClose }) => (
  <DialogTitle style={{ textAlign: "center", backgroundColor: "#FFF" }}>
    {title}
    <IconButton
      style={{ position: "absolute", right: "1em", top: "10px" }}
      onClick={handleClose}
    >
      <ClearRoundedIcon />
    </IconButton>
  </DialogTitle>
);

/**
 * render a key value pair row display, inside a dialog.
 * @param {{name:string,value:string,ph:string}} title
 * @returns 
 */
export const DialogKeyValueRow = ({ name, value, ph }) => {
  return (
    <div
      style={{
        width: "100%",
        textTransform: "none",
        backgroundColor: "#FFF",
        margin: "2em 0",
      }}
    >
      <Typography style={{ padding: "10.5px 5%" }}>
        {name}
        <span style={{ position: "absolute", right: "1em", color: "#777" }}>
          {value || (ph ? ph : "N/A")}
        </span>
      </Typography>
    </div>
  );
};


/**
 * render a row button inside a dialog
 */
export const DialogRowButton = ({ children, style, ...rest }) => {
  return (
    <Button
      style={{
        display: "block",
        width: "100%",
        padding: "10.5px 5%",
        textTransform: "none",
        backgroundColor: "#FFF",
        margin: "2em 0",
        textAlign: "left",
        fontSize: "1rem",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
 * render a slide up open dialog
 */
export default function SlideDialog({
  open,
  handleClose,
  children,
}) {
 
  const classes = useStyles();
 
  return (   
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}    
        fullScreen
        // className={classes.container}   
        classes={{         
          container:classes.container,  
          paper:classes.paper,        
        }}                
      >
        {children}
        {/* <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>  
  );
}
