import React,{ useState , useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',        
        margin: '0 auto',
        height: 'calc(100vh - 180px)',
        minHeight: "480px",
        backgroundColor: theme.palette.background.paper,
        top: 'calc(2vh + 10px)',
        borderRadius: theme.shape.borderRadius,   
        position:'relative',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',        
        alignItems: 'center',
      },
      preReaderId: {
          color: theme.palette.text.secondary,
          fontSize: '1.5rem',
          margin: '50px 0px 10px 0px',
          
      },
      readerId:{
        backgroundColor:'green',
        padding: '15px 25px',
        borderRadius: '1em',
        color: 'white',
        fontWeight: 'bold',
      },
      preStatus: {
          marginTop: '20px',
          color: theme.palette.text.secondary,
      },
      status: {
        color: 'green',
        fontWeight: 'bold',
      },

      connectBtn: {          
          margin: '2em auto',
          fontWeight:'bold',
          fontSize: '1.5em',
          color: 'green',          
      },
      reconnectBtn: {
        margin: '2em auto',
        fontWeight:'bold',
        fontSize: '1.5em',
        color: 'white',   
        backgroundColor: 'orange',
        borderRadius: '0.5em',
        '&:hover': {
            backgroundColor:'red'
        }
      }

}))

function Timer() {
    const classes = useStyles()
    const [remaining,setRemaining] = useState(120);
    const minute = remaining / 60;
    const second = remaining % 60;
    const format = (second) => `${parseInt(second / 10)}${parseInt(second % 10)}`
    useEffect(() => {        
        const timer = setInterval(() => {
            setRemaining(r=>r-1);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    },[])

    return (
        <Typography variant='h4' className={classes.status}>
            {`${format(minute)}:${format(second)}`}
            </Typography>
    )
}

export const HomeTab = (props) => {
    const classes = useStyles()
    const [connected,setConnected] = useState(false)
    
    return (
       <Paper className={classes.root}>
           <Typography variant='subtitle2' className={classes.preReaderId}>Reader ID</Typography>
           <Typography variant='h3' className={classes.readerId}           
            >AMS-PGH</Typography>
           <Typography variant='subtitle2' className={classes.preStatus}>Reader Status</Typography>
           <Typography variant='h4' className={classes.status}>Running</Typography>
           <Typography variant='subtitle2' className={classes.preStatus}>Remaining Time</Typography>
           <Timer></Timer>
        
        {connected && <Button className={classes.connectBtn} onClick={
            () => {setConnected(false)}
        }>Connected</Button>}
        {!connected && <Button className={classes.reconnectBtn} onClick={
            () => {setConnected(true)}
        }>Connect</Button>}

       </Paper>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)
