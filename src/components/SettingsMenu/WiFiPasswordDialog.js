import React from "react";
import Divider from "@material-ui/core/Divider";
import SlideDialog,{SlideDialogTitle, DialogRowButton } from "../../components/SlideDialog";
import { PasswordInput } from "../MyInputs";
import Typography from "@material-ui/core/Typography";

/**
 * Open a dialog to enter wifi password.
 * If the wifi network is insecure (no encryption), the password is not required.
 * But will prompt In secure network situation.
 * @param {{
 * open:Boolean,
 * psk:string,
 * encryption:'on'|'off'|undefined,
 * ssid:string,
 * setPasswordDialog:Function,
 * connectWifi:Function,
 * }} param0 
 * @returns 
 */
const PasswordDialog = ({
    open,
    psk,
    encryption,
    ssid,
    setPasswordDialog,
    connectWifi,
  }) => {

    const handleClose = () => {
      setPasswordDialog((state) => ({ ...state, open: false, psk: "" }));
    };
    return (
      <SlideDialog open={open} handleClose={handleClose}>
        <SlideDialogTitle
          title={encryption === "on" ? "Enter Password" : "Join Network"}
          handleClose={handleClose}
        />
        <Divider />
        <div style={{ backgroundColor: "#EEE", height: "100%" }}>
          <Typography style={{ margin: "1em", color: "#444" }}>
            {encryption === "on"
              ? `Enter Password for ${ssid}`
              : `Are you sure to join insecure network ${ssid}?`}
          </Typography>
  
          {encryption === "on" && (
            <PasswordInput
              style={{ margin: "0.2em 5%", width: "90%", maxWidth: "400px" }}
              value={psk}
              onChange={(e) =>
                setPasswordDialog((state) => ({ ...state, psk: e.target.value }))
              }
            />
          )}
  
          <DialogRowButton
            color="primary"
            disabled={encryption === "on" && psk.length < 8 ? true : null}
            style={{ textAlign: "center" }}
            onClick={() => {
              handleClose();
              connectWifi(ssid, psk);
            }}
          >
            {encryption === "on" && psk.length < 8
              ? "password too short"
              : "Join"}
          </DialogRowButton>
        </div>
      </SlideDialog>
    );
  };

export default PasswordDialog;