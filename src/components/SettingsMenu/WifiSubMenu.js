import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import {
  getWifiList,
  switchWifiMode,
  connectWifi,
  forgetWifi,
  setWifiPriority,
  setWifiPassword,
} from "../../redux/actions/wifiAction";
import { setConfirmDialog } from "../../redux/actions/uiAction";

// other components
import ListItemDivider from '../ListItemDivider'
import PasswordDialog from './WiFiPasswordDialog'
import WifiInfoDialog from "./WifiInfoDialog";
import WifiItems from './WifiItems'
import { DialogRowButton } from "../SlideDialog";


/**
 * Render the wifi sub menu in settins menu.
 * The wifi sub menu is directly connected to redux.
 * @param {*} param0 
 * @returns 
 */
const WifiSubMenu = ({    
    wifiStatus,
    getWifiList,
    switchWifiMode,
    forgetWifi,
    connectWifi,
    setWifiPriority,
    setConfirmDialog,
    setWifiPassword,
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
  
    const [passwordDialog, setPasswordDialog] = useState({
      open: false,
      ssid: "",
      psk: "",
      encryption: "on",
    });
  
    const handleWifiInfoDialogOpen = (ssid) => {
      setWifiInfoDialog({
        open: true,
        known: knownNetworks.map((i) => i.ssid).includes(ssid),
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
          setWifiPassword={setWifiPassword}
        />
        <PasswordDialog
          {...passwordDialog}
          setPasswordDialog={setPasswordDialog}
          connectWifi={connectWifi}
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
                if (ssid && mode === "client") {
                  // if ssid is set, this means reader is connected to WiFi.
                  // in this case, when user set mode to AP, we need to confirm he want to disconnect from WiFi
                  setConfirmDialog({
                    open: true,
                    title: "Disconnect Reader from Wi-Fi",
                    message:
                      "Are you sure you want to disconnect Reader from Wi-Fi Network? Reader will switch to AP mode.",
                    onConfirm: () => {
                      switchWifiMode("ap");
                    },
                  });
                } else {
                  switchWifiMode(mode === "ap" ? "client" : "ap");
                }
              }}
              color="primary"
            />
          </div>
  
          {/* {ssid && <WifiItems {...connectedNetwork} isConnected={true}/>} */}
        </Paper>
  
        {error && (
          <Typography
            color="secondary"
            style={{ paddingLeft: "1.5em", marginTop: "0.5em" }}
            variant="subtitle2"
          >
            {typeof error === "string"
              ? error
              : "Error in loading Wi-Fi Settings"}
          </Typography>
        )}
  
        {mode === "ap" ? (
          <Typography
            style={{ padding: "0.5em 1.5em", color: "#666" }}
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
                    known={true}
                    {...(availableNetworks[_ssid] || { ssid: _ssid })}
                    handleWifiInfoDialogOpen={handleWifiInfoDialogOpen}
                    setWifiPriority={setWifiPriority}
                    setConfirmDialog={setConfirmDialog}
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
  
            <Paper>
              <ListItemDivider>
                {Object.keys(availableNetworks)
                  .filter((i) => !knownNetworks.map((i) => i.ssid).includes(i))
                  .map((ssid, idx) => (
                    <WifiItems
                      key={ssid}
                      known={false}
                      {...availableNetworks[ssid]}
                      handleWifiInfoDialogOpen={handleWifiInfoDialogOpen}
                      setPasswordDialog={setPasswordDialog}
                    />
                  ))}
              </ListItemDivider>             
            </Paper>

            <DialogRowButton
                  onClick={getWifiList}
                  style={{textAlign:'center'}}
                  disabled={loading}
              >
                  Scan Wi-Fi Network
            </DialogRowButton>
          </>
        )}
      </>
    );
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
    setConfirmDialog,
    setWifiPassword,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(WifiSubMenu);
  