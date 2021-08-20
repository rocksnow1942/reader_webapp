import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',        
        margin: '0 auto',
        height: 'calc(100vh - 180px)',
        minHeight: "480px",
        backgroundColor: theme.palette.background.paper,
        top: 'calc(2vh + 10px)',
        borderRadius: theme.shape.borderRadius,        
      },
    title: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '1.5em',
        fontWeight: 'bold',
        
    },
    resultPositive: {
        margin: '0 auto',        
        color: 'red',
    },
    resultNegative: {
        margin: '0 auto',        
        color: 'green',
    },
    resultOther : {
        margin: '0 auto',
        color: 'orange',
    }
}))

export const RecentTab = (props) => {
    const classes = useStyles()

    return (
       <List component="ul" className={classes.root} >
            <ListItem >                       
            <Typography className={classes.title}>Recent Tests</Typography>
            </ListItem>

            

            
        {
            [['2021-08-19 08:21','Negative'],
             ['2021-08-19 06:21','Negative'],
             ['2021-08-18 22:21','Positive'],
             ['2021-08-17 15:21','Invalid'],
             ['2021-08-17 15:21','Negative'],
             ['2021-08-17 15:21','Negative'],
             ['2021-08-17 15:21','Negative'],
             ['2021-08-17 15:21','Positive'],
             ['2021-08-19 08:21','Negative'],
             ['2021-08-19 06:21','Negative'],
             
          
        ].map(([t,r],index) =>  
        <React.Fragment key={index}>
            <Divider  variant='middle'/>
            <ListItem key={index}>
                <Typography>{t}</Typography> 
                <Typography className={
                    r=='Positive' ? classes.resultPositive 
                    : r=='Negative' ? classes.resultNegative : classes.resultOther 
                    }>{r}</Typography>
            </ListItem>
            
        </React.Fragment>
        )
        }
    

        </List>
    )
}



const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTab)
