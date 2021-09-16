import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// components import
import SubMenuTitle from "../components/SettingsMenu/SubMenuTitle"
import MainMenu from "../components/SettingsMenu/MainMenu";
import WifiSubMenu from '../components/SettingsMenu/WifiSubMenu'
import RegisterReaderSubMenu from '../components/SettingsMenu/RegisterReaderSubMenu'
import CreateAccountSubMenu from "../components/SettingsMenu/CreateAccountSubMenu";
import UpdateFirmwareSubMenu from "../components/SettingsMenu/UpdateFirmwareSubMenu";


export const SettingsTab = (props) => {
  const { open } = props;
  
  

  const [subMenu, setSubMenu] = useState(null);

  if (!open) {
    return null;
  }
  let Menu;
  console.log(subMenu)
  switch (subMenu) {
    case "Wi-Fi":
      Menu = WifiSubMenu;
      break
    case "Register Reader":
      Menu = RegisterReaderSubMenu
      break
    case "Create Account":
      Menu = CreateAccountSubMenu
      break
    case "Update Firmware":
      Menu = UpdateFirmwareSubMenu
      break
    case "Factory Reset":
    case "About":
    default:
      return (
        <MainMenu          
          setSubMenu={setSubMenu}          
        />
      );
  }
  return (<SubMenuTitle name={subMenu} setSubMenu={setSubMenu}>
  <Menu/>
</SubMenuTitle>)

};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
