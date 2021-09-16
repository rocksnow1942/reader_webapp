import React from "react";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// icons
import WifiIcon from "@material-ui/icons/Wifi";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SystemUpdateIcon from "@material-ui/icons/SystemUpdate";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import InfoIcon from "@material-ui/icons/Info";

// components
import ListItemDivider from "../ListItemDivider";

// redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
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
  return (
    <List component="ul" className={classes.root}>
      <ListItem>
        <Typography className={classes.title}>Settings</Typography>
      </ListItem>

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
  );
};

const mapStateToProps = (state) => ({
  currentFirmwareVer: state.data.firmwareVersion,
});

export default connect(mapStateToProps)(MainMenu);
