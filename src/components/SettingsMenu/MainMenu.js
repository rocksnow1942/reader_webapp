import React from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// icons
import WifiIcon from "@mui/icons-material/Wifi";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import InfoIcon from "@mui/icons-material/Info";

// components
import ListItemDivider from "../ListItemDivider";

// redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  root: {
    width: theme.customSpacings.innerWidth,
    margin: "auto",
    height: theme.customSpacings.innerHeight,
    backgroundColor: theme.palette.background.paper,
    top: theme.customSpacings.innerPosition.top,
    borderRadius: theme.shape.innerBorderRadius,
    boxShadow: "1px",
    padding: "0px",
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: "bold",
  },

  subMenuTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "1.5em",
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    height: "2em",
  },
  version: {
    color: theme.palette.text.secondary,
    width: "5em",
  },
}));

const MainMenuItem = ({ name, icon, children, setSubMenu }) => {
  return (
    <ListItem
      key={name}
      button
      onClick={() => {
        setSubMenu(name);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
      {children}
    </ListItem>
  );
};

const MainMenu = ({ currentFirmwareVer, setSubMenu }) => {
  const classes = useStyles();
  return (<>

<div className={classes.tabTitle}>
      
          <Typography className={classes.titleText}>Settings</Typography>
         
          
        </div>
    <List component="ul" className={classes.root}>

 

      <ListItemDivider>
        {[
          { name: "Wi-Fi", icon: <WifiIcon /> },

          { name: "Register Reader", icon: <DeveloperModeIcon /> },

          { name: "Create Account", icon: <AccountCircleIcon /> },

          {
            name: "Update Firmware",
            icon: <SystemUpdateIcon />,
            children: (
              <Typography variant="subtitle2" className={classes.version}>
                {currentFirmwareVer}
              </Typography>
            ),
          },
        ].map((item) => MainMenuItem({ ...item, setSubMenu }))}
      </ListItemDivider>

      <ListItem className={classes.divider} />
      <ListItem className={classes.divider} />

      <ListItemDivider>
        {[
          { name: "Factory Reset", icon: <RotateLeftIcon /> },

          { name: "About", icon: <InfoIcon /> },
        ].map((item) => MainMenuItem({ ...item, setSubMenu }))}
      </ListItemDivider>
    </List>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentFirmwareVer: state.data.firmwareVersion,
});

export default connect(mapStateToProps)(MainMenu);
