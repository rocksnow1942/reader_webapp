import React from 'react'
import { connect } from 'react-redux'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import {DialogRowButton} from '../../components/SlideDialog'

export const UpdateFirmwareSubMenu = (props) => {
    const {firmwareVersion} = props
    return (
        <div>
            <Paper style={{padding:'1.5em 0.75em 3em',textAlign:'justify'}}>
            <Typography variant="body1">Your reader firmware is up-to-date.</Typography>
             
             <Typography variant="subtitle2" style={{padding:'1em 0em 0em'}}>
                v{firmwareVersion} Release Notes:                                
             </Typography>
             <Typography variant="subtitle2">
                1. Added support for the following readers: PCBV2.6
             </Typography>
             <Typography variant="subtitle2">
                2. Bug fixes
             </Typography>
           
           
            </Paper>
            <DialogRowButton
                color='primary'
                style={{textAlign:'center'}}
                disabled={true}
            >
                Update Firmware
            </DialogRowButton>
            
        </div>
    )
}


const mapStateToProps = (state) => ({
    firmwareVersion: state.data.firmwareVersion
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFirmwareSubMenu)
