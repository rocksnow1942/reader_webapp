import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import makeStyles from '@mui/styles/makeStyles';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

import SnackBarAlert from '../components/SnackBarAlert'

import ConfirmDialog from "../components/ConfirmDialog";


// import tabs
import SettingsTab from "./SettingsTab";
import HomeTab from "./HomeTab";
import RecentTab from "./RecentTab";




const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.outerSpace,
    width: "calc(100vw - 10px)",
    height: "calc(90vh - 80px)",
    height: "calc(var(--vh, 1vh) * 100 - 80px)",
    maxWidth: "600px",
    margin: "5px auto 0px auto",
    overflow: "hidden",
    borderRadius: `${theme.shape.containerBorderRadius} ${theme.shape.containerBorderRadius} 0px 0px`,
  },
  bottomNav: {
    width: "calc(100vw - 10px)",
    maxWidth: "600px",
    margin: "0px auto",
    height: "70px",
    top: "calc(100% - 75px)",
    borderRadius: `0px 0px ${theme.shape.containerBorderRadius} ${theme.shape.containerBorderRadius}`,
  },
  snackbar: {
    bottom: "80px",
  },
}));

export const Home = (props) => {
  const {} = props;
  const classes = useStyles();
  const [tab, setTab] = useState(1);

  const [open, setOpen] = useState(false);


  

  return (
    <div>
      <div className={classes.container}>
        {tab === 0 && <RecentTab open={tab===0}/>}
        {tab === 1 && <HomeTab open={tab===1}/>}
        {tab === 2 && <SettingsTab open={tab===2} />}



        {/* <RecentTab open={tab===0}/>
        <HomeTab open={tab===1}/>
        <SettingsTab open={tab===2} /> */}

         
        
      </div>

      <BottomNavigation
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction label="Recents" icon={<HistoryIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>

        
          
        {/* Global snack bar*/}
        <SnackBarAlert/>
        {/* Global confirmdialog */}
        <ConfirmDialog/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
