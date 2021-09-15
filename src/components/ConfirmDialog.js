import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";

import {setConfirmDialog} from '../redux/actions/uiAction'


const useStyles = makeStyles((theme) => ({ 
  paper:{
    borderRadius: "5px",
    width: "min(calc(100vw - 30px), 570px)",
    margin: "3px",
  },
  dialogAction:{
      justifyContent: "space-evenly",
  }

 }));



function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  message,
  setConfirmDialog  
}) {
 
  const classes = useStyles();
 
  return (   
      <Dialog
        open={open}
        //TransitionComponent={Transition}
        keepMounted
        // onClose={}    
        fullWidth
        // className={classes.container}   
        classes={{         
        //   container:classes.container,  
          paper:classes.paper,        
        }}                
      >
       
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{root:classes.dialogAction}} >
          <Button onClick={()=>{
              if (onConfirm) {onConfirm();}
                setConfirmDialog({open:false})              
          }} color="primary">
            Confirm
          </Button>
          <Button onClick={()=>{              
              if (onCancel) {onCancel();}
              setConfirmDialog({open:false})              
          }} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>  
  );
}


const mapStateToProps = (state) => ({
  open: state.ui.confirmDialog.open,
  onCancel: state.ui.confirmDialog.onCancel,
  onConfirm: state.ui.confirmDialog.onConfirm,
  title: state.ui.confirmDialog.title,
  message: state.ui.confirmDialog.message,
});

const mapDispatchToProps = {
    setConfirmDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);