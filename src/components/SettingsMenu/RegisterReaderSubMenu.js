import React from 'react'
import { connect } from 'react-redux'
import {PasswordInput} from '../MyInputs'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import {DialogRowButton} from '../../components/SlideDialog'

export const RegisterReaderSubMenu = (props) => {
    const {systemID} = props
    return (
        <div>
            <Paper style={{padding:'1.5em 0.5em 3em',textAlign:'center'}}>
            <Typography variant="body1">Register reader 
            <strong> {systemID} </strong>
             under your account.</Typography>
             <Typography variant="subtitle2" style={{padding:'1em 0em'}}>
                 Enter your account login and password below.
             </Typography>
            <TextField
                name='email'
                label='Account Email'
                placeholder='Enter your account email'
                type='email'
                autoComplete='email'
                fullWidth={true}                
                style={{ margin: "0.2em 5%", width: "90%",}}
            />
            <PasswordInput
                style={{ margin: "0.2em 5%", width: "90%",}}

            />
            </Paper>
            <DialogRowButton
                color='primary'
                style={{textAlign:'center'}}
            >
                Register Reader
            </DialogRowButton>
            
        </div>
    )
}


const mapStateToProps = (state) => ({
    systemID : state.data.systemID
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReaderSubMenu)
