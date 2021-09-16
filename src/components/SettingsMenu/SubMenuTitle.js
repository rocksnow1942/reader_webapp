import React from 'react'
import { makeStyles } from "@material-ui/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({  
    subMenuTitle: {
      fontFamily: theme.typography.fontFamily,
      fontSize: "1.3em",
      fontWeight: "bold",
      textAlign: "center",      
    },
  }));
  

function SubMenuTitle ({ setSubMenu, name, children }) {
    const classes = useStyles();
    return (
        <div style={{ height: "100%", top: "0px", overflowY: "scroll" }}>
          <div style={{ padding: "0.75em 0em", backgroundColor: "#fff" , position:'relative'}}>
            <Typography className={classes.subMenuTitle}>{name}</Typography>
            <Button
              color="primary"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => {
                setSubMenu(null);
              }}
              style={{
                position: "absolute",                
                top: "1.5em",
                left: "0.6em",
                height: 0,
              }}
            >
              Back
            </Button>
          </div>
    
          <div style={{ margin: "1em 0px" }}>{children}</div>
        </div>
      );
}

export default SubMenuTitle
