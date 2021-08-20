import React, {useState} from 'react'

import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

// import tabs
import SettingsTab from './SettingsTab'
import HomeTab from './HomeTab'
import RecentTab from './RecentTab';

const useStyles = makeStyles({
    root: {
        width: "100vw",
        maxWidth: '600px',
        margin: '0 auto',
        height: '70px',
        top: "calc(100% - 76px)",
        position: 'fixed',
        borderRadius:"0px 0px 15px 15px"
    }
})






export const Home = (props) => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);

    return (
        <div className='container'>
            {tab === 0 && <RecentTab />}
            {tab === 1 && <HomeTab />}            
            {tab === 2 && <SettingsTab />}
            <BottomNavigation
                value={tab}
                onChange={(event, newValue) => {
                setTab(newValue);
                console.log(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Recents" icon={<HistoryIcon />} />
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                
            </BottomNavigation>           
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
