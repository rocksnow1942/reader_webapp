import React from 'react'
import { connect } from 'react-redux'
import {PasswordInput} from '../MyInputs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import {DialogRowButton} from '../../components/SlideDialog'

export const CreateAccountSubMenu = (props) => {

    return (
        <div>
            <Paper style={{padding:'1.5em 0.5em 3em',textAlign:'center'}}>
            <Typography variant="body1">Fill the form below to register new user account</Typography>
             <Typography variant="subtitle2" style={{padding:'1em 0em'}}>
                Please use a valid email address to receive your account activation email.
             </Typography>
            <TextField
                name='email'
                label='Account Email'
                placeholder='Enter valid email address'
                type='email'
                autoComplete='email'
                fullWidth={true}                
                style={{ margin: "0.2em 5%", width: "90%",}}
            />
            <PasswordInput
                style={{ margin: "0.2em 5%", width: "90%",}}

            />
            <PasswordInput
                style={{ margin: "0.2em 5%", width: "90%",}}
                label='Confirm Password'
            />
            </Paper>
            <DialogRowButton
                color='primary'
                style={{textAlign:'center'}}
            >
                Register Account
            </DialogRowButton>
            
        </div>
    )
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountSubMenu)
