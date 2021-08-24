import React from 'react'
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
    divider:{
        height:'2em'
    },
    version: {
        color: theme.palette.text.secondary,
        width: '5em',
    }
  }));



export const SettingsTab = (props) => {
    const classes = useStyles();
    const currentFirmwareVer = '1.2.4'

    if (!props.open) {
        return null
        }
    return (
        // < Grid container spacing={2}>
        //     <Grid item xs={12} sm={6}>
        //     <Button variant='contained' color='primary'>Button</Button>
        //     </Grid>

        //     <Grid item xs={12} sm={6}>
        //     <Button variant='contained' color='primary'>Button</Button>
        //     </Grid>

        //     <Grid item xs={12} sm={6}>
        //     <Button variant='contained' color='primary'>Button</Button>
        //     </Grid>
        // </Grid>

        <List component="ul" className={classes.root} >
            <ListItem >           
            {/* <ListItemText primary="Settings"/> */}
            <Typography className={classes.title}>Settings</Typography>
            </ListItem>

            

        <ListItem button>
            <ListItemIcon>
                <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Wi-Fi"/>
        </ListItem>
        <Divider  variant='middle'/>
        
        <ListItem button >
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



const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
