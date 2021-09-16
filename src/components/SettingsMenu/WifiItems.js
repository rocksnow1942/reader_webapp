import React from "react";

// Icons
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

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";



/**
 * convert wifi signal quality to icon
 * @param {string} quality of wifi network, range 0-5
 * @param {*} encryption 'on' or 'off'
 * @returns SignalIcon
 */
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



/**
 * Render an WiFi network item
 * Render as a List Button, with SSID, wifi signal Icon, and Info Icon
 * Click the info Icon to show more info about the network
 * Click the list item to show specific behaviour:
 *  - If known:
 *      - if is connected, show wifi network info
 *      - if no connected and available, show confirmation dialog to connect
 *      - if not connected but not available, show wifi network info
 *  - If not known, show a password input dialog, then connect to the network
 * @param {*} param0 
 * @returns 
 */
const WifiItems = ({
    ssid,
    known,
    quality,
    encryption,
    // address,
    isConnected,
    handleWifiInfoDialogOpen,
    setPasswordDialog,
    setWifiPriority,
    setConfirmDialog,
  }) => {

    const signalQuality = quality
      ? Math.floor((quality.split("/")[0] / quality.split("/")[1]) * 6)
      : -1;
    const WifiIcon = wifiIcon(signalQuality, encryption);
  
    return (
      <ListItem
        button
        onClick={() => {
          if (known) {
            if (isConnected || signalQuality === -1) {
              handleWifiInfoDialogOpen(ssid);
            } else {
              setConfirmDialog({
                open: true,
                title: `Connect to ${ssid}`,
                message: "Are you sure you want to connect to this network?",
                onConfirm: () => {
                  setWifiPriority(ssid);
                },
              });
            }
          } else {
            setPasswordDialog({
              open: true,
              ssid,
              psk: "",
              encryption: encryption,
            });
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



export default WifiItems;