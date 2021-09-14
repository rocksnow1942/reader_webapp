import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'

// icons
import WifiIcon from '@material-ui/icons/Wifi';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Paper from '@material-ui/core/Paper'
import {getWifiList} from "../redux/actions/dataActions"
import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi2BarIcon from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi3BarIcon from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';

import SignalWifi1BarLockIcon from '@material-ui/icons/SignalWifi1BarLock';
import SignalWifi2BarLockIcon from '@material-ui/icons/SignalWifi2BarLock';
import SignalWifi3BarLockIcon from '@material-ui/icons/SignalWifi3BarLock';
import SignalWifi4BarLockIcon from '@material-ui/icons/SignalWifi4BarLock';
import CheckIcon from '@material-ui/icons/Check';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import  CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.customSpacings.innerWidth,        
        margin: 'auto',
        height: theme.customSpacings.innerHeight,                
        backgroundColor: theme.palette.background.paper,
        top: theme.customSpacings.innerPosition.top,
        borderRadius: theme.shape.innerBorderRadius,
        boxShadow:'1px',
        padding: "0px",
    },    
    title: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '2em',
        fontWeight: 'bold',
        
    },
    
    subMenuTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '1.5em',
        fontWeight: 'bold',        
        textAlign:'center',        
    },
    divider:{
        height:'2em'
    },
    version: {
        color: theme.palette.text.secondary,
        width: '5em',
    }
  }));


const SubMenuTitle = ({setSubMenu, name, classes, children }) => {
    return (
        <div style={{height:'100%', top:'0px', overflowY:'scroll'}}>
            
            <div style={{paddingTop:'1em', backgroundColor:'#fff',}}>
            
            
            <Typography className={classes.subMenuTitle}>{name}</Typography>
            <Button 
            color='primary'
            startIcon={<ArrowBackIosIcon />}
            onClick={()=>{setSubMenu(null)}}
            style={{position:'relative',paddingLeft:'1.5em',
            top: '-2.25em',
            height:0
             }}>Back</Button>
            
            </div>

            <div style={{margin:'1em 0px'}} >                 
            {children}
            </div>
        </div>
    )
}
const wifiIcon = (quality, encryption) => {
    if (encryption === 'on') {
        if (quality >= 4) {
            return <SignalWifi4BarLockIcon/>
        } else if (quality >= 3) {
            return <SignalWifi3BarLockIcon/>
        } else if (quality >= 2) {
            return <SignalWifi2BarLockIcon/>
        } else if (quality >= 1) {
            return <SignalWifi1BarLockIcon/>
        } else {        
            return <SignalWifi0BarIcon/>
        }        

    } else {
        if (quality  >= 4) {
            return <SignalWifi4BarIcon/>
        } else if (quality  >= 3) {
            return <SignalWifi3BarIcon/>
        } else if (quality  >= 2) {
            return <SignalWifi2BarIcon/>
        } else if (quality  >= 1) {
            return <SignalWifi1BarIcon/>
        } else if (quality >= 0) {
            return <SignalWifi0BarIcon/>
        }
        else {
            return <SignalWifiOffIcon/>
        }
    }
}

const WifiItems = ({ssid, quality, encryption, address, isConnected}) => {
    
    return <ListItem button>
        <ListItemIcon style={{minWidth:'2em'}}>
         {isConnected && <CheckIcon color='primary'/>}
        </ListItemIcon>
        <ListItemText primary={ssid}/>

        <ListItemIcon>
        {wifiIcon(quality?Math.floor((quality.split('/')[0] / quality.split('/')[1] ) * 6):-1, encryption)}
        </ListItemIcon>
        </ListItem>
}




const WifiMenu = ({classes, 
        wifiStatus,
        getWifiList}) => {

    useEffect(()=>{
        getWifiList()
    },[getWifiList])
    
    const {ssid, loading, error, knownNetworks, availableNetworks} = wifiStatus

    const connectedNetwork = availableNetworks[ssid] || {ssid,quality:'',encryption:'',address:''}
    
    return (<>
        <Paper style={{}}>
            <div style={{display:'flex',alignContent:'center',alignItems:'center',textAlign:'center', padding:5,height: 40}}>
                <Typography style={{flexGrow:1}}>Wi-Fi</Typography>
                <div style={{flexGrow:2}}></div>
                <Switch         
                    style={{flexGrow:1}}
                    onChange={()=>{console.log('toggle switch')}}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <Divider  variant='middle'/>
            {/* {ssid && <div style={{display:'flex',alignContent:'center',alignItems:'center',textAlign:'center', padding:5 , height: 40}}>
                <Button style={{flexGrow:1}}>{ssid}</Button>
                <div style={{flexGrow:2}}></div>

            </div>} */}

            {ssid && <WifiItems {...connectedNetwork} isConnected={true}/>}
        </Paper>

        <Typography style={{marginTop:'1em', paddingLeft:'1em', fontSize:18 }}> Known Networks </Typography>
        <Paper >
            {
                knownNetworks.map((ssid)=><WifiItems key={ssid} {...availableNetworks[ssid] || {ssid}}/>)
            }

        </Paper>

        <div style={{marginTop:'1em',}}>
        <Typography component='span' style={{padding:'1em',  fontSize:18}}> Available Networks </Typography>
         {loading && <CircularProgress size={18} style={{position:'relative'}}/>}
         </div>
        <Paper >
            {
                Object.keys(availableNetworks).map((ssid)=><WifiItems key={ssid} {...availableNetworks[ssid]}/>)
            }

        </Paper>



    </>)
}



const MainMenu = ({classes,currentFirmwareVer,
    setSubMenu
})=>{
    return (      
        <List component="ul" className={classes.root} >
            <ListItem >           
            {/* <ListItemText primary="Settings"/> */}
            <Typography className={classes.title}>Settings</Typography>
            </ListItem>

        <ListItem button onClick={()=>{setSubMenu('wifi')}}>
            <ListItemIcon>
                <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Wi-Fi"/>
        </ListItem>
        <Divider  variant='middle'/>
        
        <ListItem button  >
            <ListItemIcon>
                <DeveloperModeIcon />
            </ListItemIcon>
            <ListItemText primary="Register Reader"/>
        </ListItem>
        <Divider  variant='middle'/>
        <ListItem button>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Account"/>
        </ListItem>
        <Divider  variant='middle'/>
        <ListItem button>
            <ListItemIcon>
                <SystemUpdateIcon />
            </ListItemIcon>
            <ListItemText primary="Update Firmware"/>
            <Typography variant='subtitle2' className={classes.version}>{currentFirmwareVer}</Typography>
        </ListItem>

        <ListItem className={classes.divider}/>
        
        <ListItem button className={classes.bottom}>
            <ListItemIcon>
                <RotateLeftIcon />
            </ListItemIcon>
            <ListItemText primary="Factory Reset"/>
        </ListItem>
        <Divider  variant='middle'/>
        <ListItem button className={classes.bottom}>
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About"/>
        </ListItem>

        </List>
    )
}


export const SettingsTab = ({open,
    wifiStatus,
    getWifiList
}) => {
    const classes = useStyles();
    const currentFirmwareVer = '1.2.4'

    const [subMenu,setSubMenu] = useState(null)


    if (!open) {
        return null
        }
    
    switch(subMenu){
        case 'wifi':
            return (
                <SubMenuTitle name='Wi-Fi' classes={classes} setSubMenu={setSubMenu}>
            <WifiMenu 
                classes={classes}
                wifiStatus={wifiStatus}
                getWifiList={getWifiList}
                />
                </SubMenuTitle>
                )
        default:
            return (<MainMenu 
                classes={classes} 
                setSubMenu={setSubMenu}
                currentFirmwareVer={currentFirmwareVer}
                />)
    }
    
}



const mapStateToProps = (state) => ({
    wifiStatus: state.data.wifiStatus
})

const mapDispatchToProps = {
    getWifiList
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
