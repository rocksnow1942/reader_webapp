import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// icons
import WifiIcon from "@material-ui/icons/Wifi";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SystemUpdateIcon from "@material-ui/icons/SystemUpdate";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "@material-ui/core/Paper";
import { getWifiList, switchWifiMode, connectWifi,forgetWifi,setWifiPriority } from "../redux/actions/wifiAction";
import { setConfirmDialog } from "../redux/actions/uiAction";
import SignalWifi0BarIcon from "@material-ui/icons/SignalWifi0Bar";
import SignalWifi1BarIcon from "@material-ui/icons/SignalWifi1Bar";
import SignalWifi2BarIcon from "@material-ui/icons/SignalWifi2Bar";
import SignalWifi3BarIcon from "@material-ui/icons/SignalWifi3Bar";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";

import SignalWifi1BarLockIcon from "@material-ui/icons/SignalWifi1BarLock";
import SignalWifi2BarLockIcon from "@material-ui/icons/SignalWifi2BarLock";
import SignalWifi3BarLockIcon from "@material-ui/icons/SignalWifi3BarLock";
import SignalWifi4BarLockIcon from "@material-ui/icons/SignalWifi4BarLock";
import CheckIcon from "@material-ui/icons/Check";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import CircularProgress from "@material-ui/core/CircularProgress";

import SlideDialog from "../components/SlideDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import IconButton from "@material-ui/core/IconButton";

import {PasswordInput} from '../components/MyInputs'

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

const SubMenuTitle = ({ setSubMenu, name, classes, children }) => {
  return (
    <div style={{ height: "100%", top: "0px", overflowY: "scroll" }}>
      <div style={{ paddingTop: "1em", backgroundColor: "#fff" }}>
        <Typography className={classes.subMenuTitle}>{name}</Typography>
        <Button
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            setSubMenu(null);
          }}
          style={{
            position: "relative",
            paddingLeft: "1.5em",
            top: "-2.25em",
            height: 0,
          }}
        >
          Back
        </Button>
      </div>

      <div style={{ margin: "1em 0px" }}>{children}</div>
    </div>
  );
};

const PasswordDialog = ({open,psk,encryption,ssid,setPasswordDialog,connectWifi}) => {
    const handleClose = () => {
        setPasswordDialog(state=>({...state,open:false,psk:""}));
    }
    return (
      <SlideDialog open={open} handleClose={handleClose}>
        <SlideDialogTitle title={encryption==='on'?'Enter Password':'Join Network'} handleClose={handleClose}/>
        <Divider />
        <div style={{ backgroundColor: "#EEE", height: "100%" }}>
        <Typography style={{margin:'1em', color:'#444'}}>
            {encryption==='on'?`Enter Password for ${ssid}`:`Are you sure to join insecure network ${ssid}?`}
        </Typography>
      
        
        {encryption==='on' && <PasswordInput
          style={{margin:'0.2em 5%', width:'90%', maxWidth:'400px'}}
          value={psk}
          onChange={(e)=>setPasswordDialog(state=>({...state,psk:e.target.value}))}
        />
        }

        <DialogRowButton
        color="primary"
        disabled={ ((encryption==='on') && (psk.length<8))?true:null}
        style={{textAlign:"center", }}
        >{((encryption==='on') && (psk.length<8))?"password too short":'Join'}</DialogRowButton>
        </div>
      </SlideDialog>
    )
}

const wifiIcon = (quality, encryption) => {
  if (encryption === "on") {
    if (quality >= 4) {
      return SignalWifi4BarLockIcon;
    } else if (quality >= 3) {
      return SignalWifi3BarLockIcon;
    } else if (quality >= 2) {
      return SignalWifi2BarLockIcon;
    } else if (quality >= 1) {
      return SignalWifi1BarLockIcon;
    } else {
      return SignalWifi0BarIcon;
    }
  } else {
    if (quality >= 4) {
      return SignalWifi4BarIcon;
    } else if (quality >= 3) {
      return SignalWifi3BarIcon;
    } else if (quality >= 2) {
      return SignalWifi2BarIcon;
    } else if (quality >= 1) {
      return SignalWifi1BarIcon;
    } else if (quality >= 0) {
      return SignalWifi0BarIcon;
    } else {
      return SignalWifiOffIcon;
    }
  }
};

const DialogRowButton = ({ children, style, ...rest }) => {
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

const DialogKeyValueRow = ({ name, value , ph}) => {

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
        {name}{" "}
        <span style={{ position: "absolute", right: "1em", color: "#777" }}>
          {value || (ph ? ph : "N/A")}
        </span>
      </Typography>
    </div>
  );
};

const SlideDialogTitle = ({title,handleClose})=><DialogTitle        
style={{ textAlign: "center", backgroundColor: "#FFF" }}
>
{title}
<IconButton
  style={{ position: "absolute", right: "1em", top: "10px" }}
  onClick={handleClose}
>
  <ClearRoundedIcon />
</IconButton>
</DialogTitle>

const WifiInfoDialog = ({
  open,
  setWifiInfoDialog,
  isConnected,
  ssid,
  address,
  encryption,
  frequency,
  psk,
  quality,
  forgetWifi,
  setPasswordDialog,
  setConfirmDialog
}) => {

  const handleClose = () =>
    setWifiInfoDialog((state) => ({ ...state, open: false }));

const [password,setPassword] = useState(psk || "");
useEffect(()=>{
  setPassword(psk);
},[psk])


  return (
    <SlideDialog open={open} handleClose={handleClose}>
      <SlideDialogTitle title={ssid} handleClose={handleClose}/>
      <Divider />
      <div style={{ backgroundColor: "#EEE", height: "100%" }}>
        <DialogRowButton
          color="primary"
          onClick={() => {
            if (psk) {
                if (isConnected){
                    handleClose();
                    setConfirmDialog({
                        open:true, 
                        title:`Disconnect ${ssid}`,
                        message: "Are you sure you want to disconnect from the current network?",
                        onConfirm: () => {forgetWifi(ssid)},
                    })
                } else {
                    handleClose();
                    forgetWifi(ssid);
                    console.log('this is not connected, forget')
                }
            } else {
                handleClose();
                setPasswordDialog({open:true,ssid,psk:"",encryption})
            }
          }}
        >
          {psk ? "Forget This Network" : "Join This Network"}
        </DialogRowButton>
          {
              (psk && password!==undefined) &&
              <>
              <PasswordInput
              style={{margin:'0px 5%', width:'90%', maxWidth:'400px'}}              
              value={password}
              disabled={false}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <DialogRowButton
        color="primary"
        disabled={ ((encryption==='on') && (password.length<8))?true:null}
        style={{textAlign:"center", }}
        >{((encryption==='on') && (password.length<8))?"password too short":'Save'}</DialogRowButton>
            </>
          }

        <DialogKeyValueRow name="Wi-Fi Address" value={address} />
        <DialogKeyValueRow name="Encryption" value={encryption} />
        <DialogKeyValueRow name="Frequency" value={frequency} />
        <DialogKeyValueRow name="Signal Quality" value={quality} />
        
      </div>
    </SlideDialog>
  );
};

const WifiItems = ({
  ssid,
  quality,
  encryption,
  address,
  isConnected,
  handleWifiInfoDialogOpen,
  setPasswordDialog
}) => {
  const signalQuality = quality
    ? Math.floor((quality.split("/")[0] / quality.split("/")[1]) * 6)
    : -1;
  const WifiIcon = wifiIcon(signalQuality, encryption);

  return (
    <ListItem
      button      
      onClick={() => {
        if (signalQuality === -1 && !isConnected) {
            console.log(ssid, 'is not available')
        } else if (isConnected){
            console.log('currently connected to ', ssid)
        } else {
            console.log("connected reader to ", ssid);
            setPasswordDialog({open:true,ssid,psk:"",encryption:encryption})
        }
        
      }}
    >
      <ListItemIcon style={{ minWidth: "2em" }}>
        {isConnected && <CheckIcon color="primary" />}
      </ListItemIcon>
      <ListItemText primary={ssid} />

      <ListItemIcon style={{ minWidth: "2em" }}>
        <WifiIcon />
      </ListItemIcon>

      <ListItemIcon style={{ minWidth: "2em", marginLeft: "5px" }}>
        <InfoOutlinedIcon
          onClick={(e) => {
            e.stopPropagation();
            // need to implement info dialog
            handleWifiInfoDialogOpen(ssid);
          }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

const WifiSubMenu = ({ classes, 
    wifiStatus, 
    getWifiList, 
    switchWifiMode,
    forgetWifi,
    connectWifi,
    setWifiPriority,
    setConfirmDialog
 }) => {
  useEffect(() => {
    getWifiList();
  }, [getWifiList]);

  const { ssid, loading, error, knownNetworks, availableNetworks, mode } =
    wifiStatus;

  const connectedNetwork = availableNetworks[ssid] || {
    ssid,
    quality: "",
    encryption: "",
    address: "",
  };

  const [wifiInfoDialog, setWifiInfoDialog] = useState({ open: false });

  const [passwordDialog, setPasswordDialog] = useState({ open: false, ssid:'',psk: "" ,encryption:'on'});

  

  const handleWifiInfoDialogOpen = (ssid) => {
    setWifiInfoDialog({
      open: true,
      isConnected: ssid === connectedNetwork.ssid,
      ...availableNetworks[ssid],
      ...knownNetworks.filter((i) => i.ssid === ssid)[0],
    });
  };

  

  return (
    <>
      <WifiInfoDialog
        {...wifiInfoDialog}
        setWifiInfoDialog={setWifiInfoDialog}
        forgetWifi={forgetWifi}
        setPasswordDialog={setPasswordDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <PasswordDialog
        {...passwordDialog}
        setPasswordDialog={setPasswordDialog}
        connectWifi = {connectWifi}
        
      />

      <Paper style={{}}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 5,
            height: 40,
          }}
        >
          <Typography style={{ flexGrow: 1 }}>Wi-Fi</Typography>
          <div style={{ flexGrow: 2 }}></div>
          <Switch
            checked={mode === "client" ? true : false}
            style={{ flexGrow: 1 }}
            onChange={() => {
              switchWifiMode(mode === "client" ? "ap" : "client");
            }}
            color="primary"
          />
        </div>

        {/* {ssid && <WifiItems {...connectedNetwork} isConnected={true}/>} */}
      </Paper>
      {mode === "ap" ? (
        <Typography
          style={{ paddingLeft: "1.5em", color: "#666" }}
          variant="subtitle2"
        >
          Turn on to connect reader to Wi-Fi network
        </Typography>
      ) : (
        <>
          <Typography
            style={{ marginTop: "1em", paddingLeft: "1em", fontSize: 18 }}
          >
            Known Networks
          </Typography>
          <Paper>
            <ListItemDivider>
              {knownNetworks.map(({ ssid: _ssid, psk }, idx) => (
                <WifiItems
                  key={_ssid}
                  isConnected={ssid === _ssid}
                  {...(availableNetworks[_ssid] || { ssid: _ssid })}
                  handleWifiInfoDialogOpen={handleWifiInfoDialogOpen}
                />
              ))}
            </ListItemDivider>
          </Paper>

          <div style={{ marginTop: "1em" }}>
            <Typography
              component="span"
              style={{ padding: "1em", fontSize: 18 }}
            >
              Available Networks
            </Typography>
            {loading && (
              <CircularProgress size={18} style={{ position: "relative" }} />
            )}
          </div>
          {error && (
            <Typography
              color="secondary"
              style={{ paddingLeft: "1.5em" }}
              variant="subtitle2"
            >
              Error in loading Wi-Fi Settings
            </Typography>
          )}
          <Paper>
            <ListItemDivider>
              {Object.keys(availableNetworks)
                .filter((i) => !knownNetworks.map((i) => i.ssid).includes(i))
                .map((ssid, idx) => (
                  <WifiItems
                    key={ssid}
                    {...availableNetworks[ssid]}
                    handleWifiInfoDialogOpen={handleWifiInfoDialogOpen}
                    setPasswordDialog={setPasswordDialog}
                  />
                ))}
            </ListItemDivider>
          </Paper>
        </>
      )}
    </>
  );
};

/**
 * Insert a line divider between list items
 */
const ListItemDivider = ({ children }) => {
  return children.length > 1 ? (
    <>
      {children.slice(0, -1).map((child, idx) => (
        <React.Fragment key={idx}>
          {child}
          <Divider variant="middle" />
        </React.Fragment>
      ))}
      {children[children.length - 1]}
    </>
  ) : (
    <>{children}</>
  );
};

const MainMenu = ({ classes, currentFirmwareVer, setSubMenu }) => {
  return (
    <List component="ul" className={classes.root}>
      <ListItem>
        {/* <ListItemText primary="Settings"/> */}
        <Typography className={classes.title}>Settings</Typography>
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setSubMenu("wifi");
        }}
      >
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText primary="Wi-Fi" />
      </ListItem>
      <Divider variant="middle" />

      <ListItem button>
        <ListItemIcon>
          <DeveloperModeIcon />
        </ListItemIcon>
        <ListItemText primary="Register Reader" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Create Account" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem button>
        <ListItemIcon>
          <SystemUpdateIcon />
        </ListItemIcon>
        <ListItemText primary="Update Firmware" />
        <Typography variant="subtitle2" className={classes.version}>
          {currentFirmwareVer}
        </Typography>
      </ListItem>

      <ListItem className={classes.divider} />

      <ListItem button className={classes.bottom}>
        <ListItemIcon>
          <RotateLeftIcon />
        </ListItemIcon>
        <ListItemText primary="Factory Reset" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem button className={classes.bottom}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </List>
  );
};

export const SettingsTab = (props) => {
  const { open, wifiStatus, getWifiList, swtichWifiMode } = props;
  const classes = useStyles();
  const currentFirmwareVer = "1.2.4";

  const [subMenu, setSubMenu] = useState(null);

  if (!open) {
    return null;
  }

  switch (subMenu) {
    case "wifi":
      return (
        <SubMenuTitle name="Wi-Fi" classes={classes} setSubMenu={setSubMenu}>
          <WifiSubMenu classes={classes} {...props} />
        </SubMenuTitle>
      );
    default:
      return (
        <MainMenu
          classes={classes}
          setSubMenu={setSubMenu}
          currentFirmwareVer={currentFirmwareVer}
        />
      );
  }
};

const mapStateToProps = (state) => ({
  wifiStatus: state.data.wifiStatus,
});

const mapDispatchToProps = {
  getWifiList,
  switchWifiMode,
  forgetWifi,
  connectWifi,
  setWifiPriority,
  setConfirmDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
