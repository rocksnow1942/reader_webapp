import React,{useState,useEffect} from "react";
import Divider from "@mui/material/Divider";
import SlideDialog,{SlideDialogTitle, DialogRowButton,DialogKeyValueRow} from "../../components/SlideDialog";
import { PasswordInput } from "../MyInputs";


const WifiInfoDialog = ({
  open,
  setWifiInfoDialog,
  isConnected,
  ssid,
  known,
  address,
  encryption,
  frequency,
  psk,
  quality,
  forgetWifi,
  setPasswordDialog,
  setConfirmDialog,
  setWifiPassword,
}) => {
  const handleClose = () =>
    setWifiInfoDialog((state) => ({ ...state, open: false }));

  const [password, setPassword] = useState(psk || "");

  useEffect(() => {
    // update the password state when open close state changes
    setPassword(psk);
  }, [open, psk]);

  return (
    <SlideDialog open={open} handleClose={handleClose}>
      <SlideDialogTitle title={ssid} handleClose={handleClose} />
      <Divider />
      <div style={{ backgroundColor: "#EEE", height: "100%" }}>
        <DialogRowButton
          color="primary"
          onClick={() => {
            if (known) {
              if (isConnected) {
                handleClose();
                setConfirmDialog({
                  open: true,
                  title: `Disconnect ${ssid}`,
                  message:
                    "Are you sure you want to disconnect reader from the current network?",
                  onConfirm: () => {
                    forgetWifi(ssid);
                  },
                });
              } else {
                handleClose();
                forgetWifi(ssid);
              }
            } else {
              handleClose();
              setPasswordDialog({ open: true, ssid, psk: "", encryption });
            }
          }}
        >
          {known ? "Forget This Network" : "Join This Network"}
        </DialogRowButton>
        {psk && password !== undefined && (
          <>
            <PasswordInput
              style={{ margin: "0px 5%", width: "90%", maxWidth: "400px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <DialogRowButton
              color="primary"
              disabled={
                isConnected ||
                (encryption === "on" && (password.length < 8 ? true : null))
              }
              style={{ textAlign: "center" }}
              onClick={() => {
                setWifiPassword(ssid, password);
                handleClose();
              }}
            >
              {encryption === "on" && password.length < 8
                ? "password too short"
                : "Save"}
            </DialogRowButton>
          </>
        )}

        <DialogKeyValueRow name="Wi-Fi Address" value={address} />
        <DialogKeyValueRow name="Encryption" value={encryption} />
        <DialogKeyValueRow name="Frequency" value={frequency} />
        <DialogKeyValueRow name="Signal Quality" value={quality} />
      </div>
    </SlideDialog>
  );
};


export default WifiInfoDialog;