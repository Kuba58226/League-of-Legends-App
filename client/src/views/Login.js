import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {Navigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {AppContext} from '../AppContext';
import Copyright from './../components/Copyright';

const theme = createTheme();

export default function Login() {
  const {Website} = require('../config/website.js');
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function handleOnChangeEmail(e){
    setEmail(e.target.value)
  }

  function handleOnChangePassword(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`${Website.serverName}api/auth/login`,{method: "POST", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      toggleLoggedState(true)
      toggleTokenState(data.access_token)
      toggleRoleState(data.user.role)
      console.log(isUserLogged)
    })
  }

  return (
    <div>
      {!isUserLogged ?
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/11/10/9dad23f6-2e82-45d8-a39c-232a7d2e611f/league-of-legends-world-championship-2019-finals-crowd)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Zaloguj się
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField onChange={handleOnChangeEmail}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField onChange={handleOnChangePassword}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Zapamiętaj hasło"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Zaloguj się
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Zapomniałeś hasła?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Nie masz konta? Zarejestruj się"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      : <Navigate to="/" />}
    </div>
  );
}