import React, { useState } from 'react';
import { sendLogin } from '../Services/api';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Pr.css";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [issignup, setissignup] = useState(true);

  const onResReceived = (data) => {
    if (issignup) {
      localStorage.setItem("userId", data.user._id);
    } else {
      localStorage.setItem("userId", data.id);
    }
    dispatch(authActions.login())
    navigate('/blogs')
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (issignup) {
      try{
        const data=await sendLogin(true,inputs);
        
        onResReceived(data);
      }
      catch(err){
        console.log(err);
      }
      
        
    } 
    else {
      try{
         const data=await sendLogin(false,inputs);
         
          onResReceived(data);
      }
      catch(err){
        console.log(err);
      }
      
    
    }
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  return (
    <Box width="50%"
      margin='auto'
      padding='auto'
      marginTop={6}
      marginBottom={6}
      
    
    >
      <form>
        <Box display="flex" flexDirection={"column"}>
          <Box display="flex" 
        alignItems="center" 
        justifyContent="center" 
        padding={1}>
         {!issignup&& <LoginIcon fontSize='large' style={{ fontSize: 60 }}/>}
          {issignup&&<HowToRegIcon fontSize='large' style={{fontSize: 60}}/>}
          <Typography textAlign={'center'} variant='h3' fontFamily={'quicksand'} padding={1} >{issignup ? "Signup" : "Login"}</Typography>
          </Box>
          {issignup && (
            <>
              <TextField value={inputs.name} name='name' onChange={handleChange} id='outlined-text-input' label='Name' type='text' margin="normal" />
            </>
          )}
          <TextField type='email' value={inputs.email} name='email' onChange={handleChange} id='outlined-email-input' label='Email' margin="normal" />
          <TextField type="password" value={inputs.password} name='password' onChange={handleChange} id="outlined-password-input" margin="normal" label="Password" />
          <Button onClick={handleLogin} variant='contained'
           sx={{
            borderColor: '#00B890', 
            color: 'white',
            backgroundColor:'#00B890' ,
            ':hover': {
              borderColor: '#00B890', 
              backgroundColor: 'rgba(0, 184, 144, 0.8)', 
              
            }
          }}>{issignup ? "Signup" : "Login"}</Button>
          <Button sx={{ mt: 2, borderColor: '#00B890', 
            color: '#00B890',
            backgroundColor:'white' ,
            ':hover': {
              borderColor: '#00B890', 
              backgroundColor: 'rgba(0, 184, 144, 0.2)', 
               
            } }} variant='outlined' onClick={() => setissignup(!issignup)} >{issignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Login